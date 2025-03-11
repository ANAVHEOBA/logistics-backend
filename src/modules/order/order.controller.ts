import { Request, Response } from 'express';
import { OrderCrud } from './order.crud';
import { ICreateOrderRequest, OrderStatus, IManualAddress, IDeliveryAddress, IConsumerOrderRequest, PaymentStatus, PaymentMethod } from './order.model';
import { AddressCrud } from '../address/address.crud';
import { EmailService } from '../../services/email.service';
import { UserCrud } from '../user/user.crud';
import { ProductCrud } from '../product/product.crud';
import { StoreCrud } from '../store/store.crud';
import { IUser, IUserDocument } from '../user/user.model';
import { IStore } from '../store/store.model';
import { IOrderItemResponse } from '../orderItem/orderItem.model';
import { Types } from 'mongoose';
import { ConsumerCrud } from '../consumer/consumer.crud';
import { ZoneCrud } from '../zone/zone.crud';
import { config } from '../../config/environment';
import { generatePaymentReference } from '../../utils/payment.helper';

export class OrderController {
  private orderCrud: OrderCrud;
  private addressCrud: AddressCrud;
  private emailService: EmailService;
  private userCrud: UserCrud;
  private productCrud: ProductCrud;
  private storeCrud: StoreCrud;
  private consumerCrud: ConsumerCrud;
  private zoneCrud: ZoneCrud;

  constructor() {
    this.orderCrud = new OrderCrud();
    this.addressCrud = new AddressCrud();
    this.emailService = new EmailService();
    this.userCrud = new UserCrud();
    this.productCrud = new ProductCrud();
    this.storeCrud = new StoreCrud();
    this.consumerCrud = new ConsumerCrud();
    this.zoneCrud = new ZoneCrud();
  }

  // Helper method to convert IUserDocument to IUser
  private toUser(userDoc: IUserDocument): IUser {
    return {
      _id: userDoc._id.toString(),
      email: userDoc.email,
      password: userDoc.password,
      name: userDoc.name,
      phone: userDoc.phone,
      isEmailVerified: userDoc.isEmailVerified,
      verificationCode: userDoc.verificationCode,
      verificationCodeExpiry: userDoc.verificationCodeExpiry,
      status: userDoc.status,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt
    };
  }

  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId; // Safely access userId
      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
        return;
      }
  
      const orderData = req.body as ICreateOrderRequest;
  
      // Verify pickup address ownership
      const pickupAddress = await this.addressCrud.findById(orderData.pickupAddress, userId);
      if (!pickupAddress) {
        res.status(400).json({
          success: false,
          message: 'Invalid pickup address or address does not belong to you'
        });
        return;
      }
  
      // Handle delivery address based on type
      let deliveryAddressForOrder: string | IManualAddress;
      let deliveryAddressDetails: any;
  
      if (orderData.deliveryAddress.type === 'saved') {
        if (!orderData.deliveryAddress.savedAddress) {
          res.status(400).json({
            success: false,
            message: 'Saved address ID is required when using saved address'
          });
          return;
        }
  
        const savedDeliveryAddress = await this.addressCrud.findByIdWithoutUser(
          orderData.deliveryAddress.savedAddress!
        );
        if (!savedDeliveryAddress) {
          res.status(400).json({
            success: false,
            message: 'Invalid delivery address'
          });
          return;
        }
  
        deliveryAddressForOrder = savedDeliveryAddress._id;
        deliveryAddressDetails = savedDeliveryAddress;
      } else {
        if (!orderData.deliveryAddress.manualAddress) {
          res.status(400).json({
            success: false,
            message: 'Manual address details are required when using manual address'
          });
          return;
        }
  
        deliveryAddressForOrder = orderData.deliveryAddress.manualAddress;
        deliveryAddressDetails = orderData.deliveryAddress.manualAddress;
      }
  
      // Create order with modified request data
      const modifiedOrderData: ICreateOrderRequest = {
        ...orderData,
        pickupAddress: pickupAddress._id,
        deliveryAddress: {
          type: orderData.deliveryAddress.type,
          ...(orderData.deliveryAddress.type === 'saved'
            ? { savedAddress: deliveryAddressForOrder as string }
            : { manualAddress: deliveryAddressForOrder as IManualAddress })
        }
      };
  
      const order = await this.orderCrud.createOrder(userId, modifiedOrderData);
  
      // Send order confirmation email
      const user = await this.userCrud.findById(userId);
      if (user) {
        await this.emailService.sendOrderConfirmation(this.userCrud.toUser(user), order);
      }
  
      res.status(201).json({
        success: true,
        data: {
          ...order,
          pickupAddressDetails: pickupAddress,
          deliveryAddressDetails
        }
      });
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create order'
      });
    }
  }

  public async getUserOrders(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const orders = await this.orderCrud.findUserOrders(userId);

      res.status(200).json({
        success: true,
        data: orders
      });
    } catch (error) {
      console.error('Get orders error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get orders'
      });
    }
  }

  public async getOrderById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      
      const order = await this.orderCrud.findById(id, userId);
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Get order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get order'
      });
    }
  }

  public async trackOrder(req: Request<{ trackingNumber: string }>, res: Response): Promise<void> {
    try {
      const { trackingNumber } = req.params;
      
      const order = await this.orderCrud.findByTrackingNumber(trackingNumber);
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Track order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to track order'
      });
    }
  }

  public async updateOrderStatus(
    req: Request<{ id: string }, {}, { status: OrderStatus }>,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user?.userId;
      
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User ID is required'
        });
        return;
      }

      const order = await this.orderCrud.updateOrderStatus(id, userId, status);
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      // Check if order has a userId before trying to find the user
      if (order.userId) {
        // Get user for notifications
        const user = await this.userCrud.findById(order.userId);
        
        if (user) {
          // Send status update email
          await this.emailService.sendOrderStatusUpdate(this.userCrud.toUser(user), order);
          
          // If delivered, send delivery confirmation
          if (status === 'DELIVERED') {
            await this.emailService.sendDeliveryConfirmation(this.userCrud.toUser(user), order);
          }
        }
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Update order status error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order status'
      });
    }
  }

  public async cancelOrder(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      
      const order = await this.orderCrud.cancelOrder(id, userId);
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found or cannot be cancelled'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Cancel order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to cancel order'
      });
    }
  }

  public async placeConsumerOrder(req: Request, res: Response): Promise<void> {
    try {
      const consumerId = req.consumer!.consumerId;
      const orderData = req.body as IConsumerOrderRequest;

      // 1. Validate store exists
      const store = await this.storeCrud.findById(orderData.storeId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // 2. Validate zone if provided
      let selectedZone = null;
      let zonePrice = 0;
      
      if (orderData.zoneId) {
        // Find the zone by ID
        selectedZone = await this.zoneCrud.getZoneById(orderData.zoneId);
        if (!selectedZone) {
          res.status(404).json({
            success: false,
            message: 'Selected delivery zone not found'
          });
          return;
        }
        
        // Set the zone price
        zonePrice = selectedZone.deliveryPrice;
        
        // If using a zone, ensure the city in the delivery address matches the zone
        if (orderData.deliveryAddress.type === 'manual' && 
            orderData.deliveryAddress.manualAddress) {
          // Update the city to match the zone name
          orderData.deliveryAddress.manualAddress.city = selectedZone.name;
          orderData.deliveryAddress.manualAddress.state = 'Edo State'; // Default state
        }
      }

      // 3. Validate products and check stock
      for (const item of orderData.items) {
        const validationResult = await this.productCrud.validateGuestOrderQuantity(
          item.productId,
          item.quantity
        );

        if (!validationResult.valid) {
          res.status(400).json({
            success: false,
            message: `Product validation failed: ${validationResult.message}`
          });
          return;
        }
      }

      // 4. Handle delivery address
      let deliveryAddress: IDeliveryAddress;
      if (orderData.deliveryAddress.type === 'saved') {
        if (!orderData.deliveryAddress.savedAddress) {
          res.status(400).json({
            success: false,
            message: 'Saved address ID is required'
          });
          return;
        }
        const savedAddress = await this.addressCrud.findById(
          orderData.deliveryAddress.savedAddress,
          consumerId
        );
        if (!savedAddress) {
          res.status(400).json({
            success: false,
            message: 'Invalid delivery address'
          });
          return;
        }
        deliveryAddress = {
          type: 'saved',
          savedAddress: savedAddress._id.toString()
        };
      } else {
        if (!orderData.deliveryAddress.manualAddress) {
          res.status(400).json({
            success: false,
            message: 'Manual address details are required'
          });
          return;
        }
        deliveryAddress = {
          type: 'manual',
          manualAddress: orderData.deliveryAddress.manualAddress
        };
      }

      // Generate payment reference
      const paymentReference = generatePaymentReference();
      
      // Get bank account details from config
      const bankAccountDetails = config.bankAccounts.default;
      
      // Create the order with payment information
      const order = await this.orderCrud.createConsumerOrder(
        consumerId,
        store._id.toString(),
        {
          ...orderData,
          deliveryAddress
        },
        selectedZone ? selectedZone._id.toString() : undefined,
        zonePrice,
        {
          paymentStatus: 'PENDING',
          paymentMethod: orderData.paymentMethod || 'BANK_TRANSFER',
          paymentReference,
          bankAccountDetails
        }
      );

      // Send notifications
      const consumer = await this.consumerCrud.findById(consumerId);
      if (!consumer) {
        throw new Error('Consumer not found');
      }

      await this.emailService.sendConsumerOrderConfirmation(
        {
          email: consumer.email,
          name: `${consumer.firstName} ${consumer.lastName}`
        },
        order
      );

      // Send store notification
      await this.emailService.sendStoreOrderNotification(
        store.contactInfo.email,
        order,
        order.items
      );

      res.status(201).json({
        success: true,
        data: {
          ...order,
          paymentInstructions: {
            reference: paymentReference,
            bankDetails: bankAccountDetails,
            amount: order.price,
            instructions: "Please transfer the exact amount and use your payment reference as the transaction description."
          }
        }
      });
    } catch (error) {
      console.error('Place consumer order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to place order'
      });
    }
  }

  public async getConsumerOrders(req: Request, res: Response): Promise<void> {
    try {
      const consumerId = req.user!.userId;
      const orders = await this.orderCrud.findConsumerOrders(consumerId);

      res.status(200).json({
        success: true,
        data: orders
      });
    } catch (error) {
      console.error('Get consumer orders error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get consumer orders'
      });
    }
  }

  public async getConsumerOrderById(req: Request, res: Response): Promise<void> {
    try {
      const consumerId = req.user!.userId;
      const { orderId } = req.params;

      const order = await this.orderCrud.findConsumerOrderById(orderId, consumerId);
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Get consumer order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get order'
      });
    }
  }

  public async cancelConsumerOrder(req: Request, res: Response): Promise<void> {
    try {
      const consumerId = req.user!.userId;
      const { orderId } = req.params;

      const order = await this.orderCrud.cancelConsumerOrder(orderId, consumerId);
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found or cannot be cancelled'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Cancel consumer order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to cancel order'
      });
    }
  }

  public async uploadPaymentReceipt(req: Request, res: Response): Promise<void> {
    try {
      const consumerId = req.consumer!.consumerId;
      const { orderId } = req.params;
      const { receiptUrl } = req.body;

      if (!receiptUrl) {
        res.status(400).json({
          success: false,
          message: 'Receipt URL is required'
        });
        return;
      }

      const order = await this.orderCrud.updatePaymentReceipt(orderId, consumerId, receiptUrl);
      
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found or you do not have permission'
        });
        return;
      }

      // Notify admin about new payment receipt
      // This could be an email or a notification in the admin dashboard
      
      res.status(200).json({
        success: true,
        data: {
          message: 'Payment receipt uploaded successfully',
          paymentStatus: order.paymentStatus
        }
      });
    } catch (error) {
      console.error('Upload payment receipt error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload payment receipt'
      });
    }
  }

  public async getPaymentInstructions(req: Request, res: Response): Promise<void> {
    try {
      const consumerId = req.consumer!.consumerId;
      const { orderId } = req.params;

      const order = await this.orderCrud.findConsumerOrderById(orderId, consumerId);
      
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          orderId: order._id,
          trackingNumber: order.trackingNumber,
          amount: order.price,
          paymentReference: order.paymentReference,
          paymentStatus: order.paymentStatus,
          bankAccountDetails: order.bankAccountDetails,
          instructions: "Please transfer the exact amount and use your payment reference as the transaction description."
        }
      });
    } catch (error) {
      console.error('Get payment instructions error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get payment instructions'
      });
    }
  }
}