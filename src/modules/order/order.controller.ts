import { Request, Response } from 'express';
import { OrderCrud } from './order.crud';
import { ICreateOrderRequest, OrderStatus, IManualAddress, IDeliveryAddress } from './order.model';
import { AddressCrud } from '../address/address.crud';
import { EmailService } from '../../services/email.service';
import { UserCrud } from '../user/user.crud';

export class OrderController {
  private orderCrud: OrderCrud;
  private addressCrud: AddressCrud;
  private emailService: EmailService;
  private userCrud: UserCrud;

  constructor() {
    this.orderCrud = new OrderCrud();
    this.addressCrud = new AddressCrud();
    this.emailService = new EmailService();
    this.userCrud = new UserCrud();
  }

  createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.userId;
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
          orderData.deliveryAddress.savedAddress
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
          ...(orderData.deliveryAddress.type === 'saved' ? 
            { savedAddress: deliveryAddressForOrder as string } : 
            { manualAddress: deliveryAddressForOrder as IManualAddress })
        }
      };

      const order = await this.orderCrud.createOrder(userId, modifiedOrderData);

      // Send order confirmation email
      const user = await this.userCrud.findById(userId);
      if (user) {
        await this.emailService.sendOrderConfirmation(user, order);
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
  };

  getUserOrders = async (
    req: Request,
    res: Response
  ): Promise<void> => {
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
  };

  getOrderById = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
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
  };

  trackOrder = async (
    req: Request<{ trackingNumber: string }>,
    res: Response
  ): Promise<void> => {
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
  };

  updateOrderStatus = async (
    req: Request<{ id: string }, {}, { status: OrderStatus }>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user!.userId;
      
      const order = await this.orderCrud.updateOrderStatus(id, userId, status);
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
      console.error('Update order status error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order status'
      });
    }
  };

  cancelOrder = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
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
  };
}