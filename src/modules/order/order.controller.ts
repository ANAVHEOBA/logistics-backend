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
import { AdminCrud } from '../admin/admin.crud';
import { IConsumerOrdersQuery } from './order.model';

export class OrderController {
  private orderCrud: OrderCrud;
  private addressCrud: AddressCrud;
  private emailService: EmailService;
  private userCrud: UserCrud;
  private productCrud: ProductCrud;
  private storeCrud: StoreCrud;
  private consumerCrud: ConsumerCrud;
  private zoneCrud: ZoneCrud;
  private adminCrud: AdminCrud;

  constructor() {
    this.orderCrud = new OrderCrud();
    this.addressCrud = new AddressCrud();
    this.emailService = new EmailService();
    this.userCrud = new UserCrud();
    this.productCrud = new ProductCrud();
    this.storeCrud = new StoreCrud();
    this.consumerCrud = new ConsumerCrud();
    this.zoneCrud = new ZoneCrud();
    this.adminCrud = new AdminCrud();
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

  private async calculateProductTotal(items: IConsumerOrderRequest['items']): Promise<number> {
    let total = 0;
    for (const item of items) {
      const product = await this.productCrud.getProductById(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      
      // Get base product price
      let itemPrice = product.price;

      // Add variant prices if any
      if (item.variantData) {
        for (const variant of item.variantData) {
          const matchingVariant = product.variants?.find(v => v.name === variant.name);
          if (matchingVariant) {
            const optionIndex = matchingVariant.options.findIndex(
              option => option === variant.value
            );
            if (optionIndex !== -1 && matchingVariant.prices && matchingVariant.prices[optionIndex]) {
              itemPrice += matchingVariant.prices[optionIndex];
            }
          }
        }
      }
      
      // Multiply by quantity
      total += itemPrice * item.quantity;
    }
    return total;
  }

  public async placeConsumerOrder(req: Request, res: Response): Promise<void> {
    try {
      const consumerId = req.consumer!.consumerId;
      const orderData = req.body as IConsumerOrderRequest;

      // 1. Validate store exists and get store address
      const store = await this.storeCrud.findById(orderData.storeId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // 2. Set pickup address as store's default address
      const pickupAddress: IManualAddress = {
        street: store.address.street,
        city: store.address.city,
        state: store.address.state,
        country: store.address.country,
        postalCode: store.address.postalCode,
        recipientName: store.storeName,
        recipientPhone: store.contactInfo.phone,
        recipientEmail: store.contactInfo.email
      };

      // 3. Validate zone and calculate delivery price
      let selectedZone = null;
      let zonePrice = 0;
      
      if (!orderData.zoneId) {
        res.status(400).json({
          success: false,
          message: 'Delivery zone is required'
        });
        return;
      }

      selectedZone = await this.zoneCrud.getZoneById(orderData.zoneId);
      if (!selectedZone) {
        res.status(404).json({
          success: false,
          message: 'Selected delivery zone not found'
        });
        return;
      }

      // Set the zone price in Naira
      zonePrice = selectedZone.deliveryPrice;

      // 4. Calculate prices
      const productTotal = await this.calculateProductTotal(orderData.items);
      const deliveryFee = zonePrice;
      const totalPrice = productTotal + deliveryFee;

      // Create order items with correct prices
      const orderItems = await Promise.all(orderData.items.map(async (item) => {
        const product = await this.productCrud.getProductById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        let itemPrice = product.price;
        if (item.variantData) {
          for (const variant of item.variantData) {
            const matchingVariant = product.variants?.find(v => v.name === variant.name);
            if (matchingVariant) {
              const optionIndex = matchingVariant.options.findIndex(
                option => option === variant.value
              );
              if (optionIndex !== -1 && matchingVariant.prices && matchingVariant.prices[optionIndex]) {
                itemPrice += matchingVariant.prices[optionIndex];
              }
            }
          }
        }

        return {
          ...item,
          price: itemPrice,
          storeId: orderData.storeId
        };
      }));

      // Create the order with the correct total price
      const order = await this.orderCrud.createConsumerOrder(
        consumerId,
        orderData.storeId,
        {
          ...orderData,
          items: orderItems,
          pickupAddress: {
            type: 'manual',
            manualAddress: pickupAddress
          },
          totalPrice,
          paymentMethod: orderData.paymentMethod || 'BANK_TRANSFER',
          paymentReference: generatePaymentReference(),
          bankAccountDetails: config.bankAccounts.default
        },
        selectedZone._id.toString(),
        deliveryFee
      );

      // Send notifications
      await this.sendOrderNotifications(order, store, consumerId);

      res.status(201).json({
        success: true,
        data: {
          ...order,
          paymentInstructions: {
            reference: order.paymentReference,
            bankDetails: config.bankAccounts.default,
            amount: totalPrice,
            deliveryFee,
            subtotal: productTotal,
            currency: 'NGN',
            instructions: "Please transfer the exact amount in Naira and use your payment reference as the transaction description."
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

  private async sendOrderNotifications(order: any, store: IStore, consumerId: string): Promise<void> {
    const consumer = await this.consumerCrud.findById(consumerId);
    if (!consumer) {
      throw new Error('Consumer not found');
    }

    await Promise.all([
      this.emailService.sendConsumerOrderConfirmation(
        {
          email: consumer.email,
          name: `${consumer.firstName} ${consumer.lastName}`
        },
        order
      ),
      this.emailService.sendStoreOrderNotification(
        store.contactInfo.email,
        order,
        order.items
      )
    ]);
  }

  public async getConsumerOrders(req: Request, res: Response): Promise<void> {
    try {
      const consumerId = req.consumer!.consumerId;
      const query: IConsumerOrdersQuery = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        status: req.query.status as OrderStatus,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined
      };

      const { orders, total } = await this.orderCrud.findConsumerOrders(consumerId, query);

      res.status(200).json({
        success: true,
        data: {
          orders,
          total,
          page: query.page,
          limit: query.limit,
          totalPages: Math.ceil(total / query.limit!)
        }
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

      // Calculate subtotal (product total) and delivery fee
      const productTotal = order.items.reduce((total: number, item: IOrderItemResponse) => {
        return total + (item.price * item.quantity);
      }, 0);

      const deliveryFee = order.zonePrice || 0;
      const totalPrice = productTotal + deliveryFee;

      res.status(200).json({
        success: true,
        data: {
          ...order,
          paymentInstructions: {
            reference: order.paymentReference,
            bankDetails: order.bankAccountDetails || config.bankAccounts.default,
            amount: totalPrice,
            deliveryFee,
            subtotal: productTotal,
            currency: 'NGN',
            instructions: "Please transfer the exact amount in Naira and use your payment reference as the transaction description."
          }
        }
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

  public async markOrderPayment(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const consumerId = req.consumer!.consumerId;
      const { paymentMethod, amount } = req.body;

      // Validate input
      if (!paymentMethod || !amount) {
        res.status(400).json({
          success: false,
          message: 'Payment method and amount are required'
        });
        return;
      }

      // Generate payment reference
      const paymentReference = generatePaymentReference();

      const order = await this.orderCrud.markOrderPayment(orderId, consumerId, {
        paymentMethod,
        paymentReference,
        amount
      });

      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found or unauthorized'
        });
        return;
      }

      try {
        // Notify admin about new payment
        await this.notifyAdminOfNewPayment(order);
      } catch (notificationError) {
        // Log notification error but don't fail the request
        console.error('Admin notification error:', notificationError);
      }

      res.status(200).json({
        success: true,
        data: {
          message: 'Payment marked successfully',
          order: {
            _id: order._id,
            trackingNumber: order.trackingNumber,
            paymentStatus: order.paymentStatus,
            paymentMethod: order.paymentMethod,
            paymentReference: order.paymentReference,
            amount: order.price,
            paymentDate: order.paymentDate,
            status: order.status,
            price: order.price
          }
        }
      });
    } catch (error) {
      console.error('Mark payment error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to mark payment'
      });
    }
  }

  private async notifyAdminOfNewPayment(order: any): Promise<void> {
    // Send email notification to admin
    await this.emailService.sendPaymentNotification(order);
    
    // Create notification record in admin notifications
    await this.adminCrud.createPaymentNotification({
      orderId: order._id,
      type: 'NEW_PAYMENT',
      status: 'UNREAD',
      details: {
        orderNumber: order.trackingNumber,
        amount: order.price,
        paymentReference: order.paymentReference,
        consumerName: `${order.userId.firstName} ${order.userId.lastName}`
      }
    });
  }
}