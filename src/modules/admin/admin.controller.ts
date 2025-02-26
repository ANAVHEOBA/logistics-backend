import { Request, Response } from 'express';
import { AdminCrud } from './admin.crud';
import { UserCrud } from '../user/user.crud';
import { IAdminLoginRequest, IAdminDocument } from './admin.model';
import jwt from 'jsonwebtoken';
import { config } from '../../config/environment';
import mongoose from 'mongoose';
import { OrderCrud } from '../order/order.crud';
import { OrderStatus } from '../order/order.model';
import { EmailService } from '../../services/email.service';
import { ConsumerCrud } from '../consumer/consumer.crud';

// Define the valid order statuses
const ORDER_STATUSES = [
  'PENDING',
  'CONFIRMED',
  'PICKED_UP',
  'IN_TRANSIT',
  'DELIVERED',
  'CANCELLED',
  'FAILED_DELIVERY'
] as const;

export class AdminController {
  private adminCrud: AdminCrud;
  private userCrud: UserCrud;
  private orderCrud: OrderCrud;
  private emailService: EmailService;
  private consumerCrud: ConsumerCrud;

  constructor() {
    this.adminCrud = new AdminCrud();
    this.userCrud = new UserCrud();
    this.orderCrud = new OrderCrud();
    this.emailService = new EmailService();
    this.consumerCrud = new ConsumerCrud();
  }

  createFirstAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      // Check if any admin exists
      const existingAdmin = await this.adminCrud.findByEmail('admin@logistics.com');
      if (existingAdmin) {
        res.status(400).json({
          success: false,
          message: 'Admin already exists'
        });
        return;
      }

      const adminData = {
        email: 'admin@logistics.com',
        password: 'admin123', // This will be hashed by the schema
        name: 'System Admin',
        role: 'admin' as const
      };

      const admin = await this.adminCrud.createAdmin(adminData);

      res.status(201).json({
        success: true,
        data: {
          _id: admin._id.toString(),
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      });
    } catch (error) {
      console.error('Create admin error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create admin'
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body as IAdminLoginRequest;

      const admin = await this.adminCrud.findByEmail(email);
      if (!admin) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
        return;
      }

      const isPasswordValid = await admin.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
        return;
      }

      // Update last login
      await this.adminCrud.updateLastLogin(admin._id.toString());

      // Generate admin token
      const token = jwt.sign(
        {
          adminId: admin._id.toString(),
          email: admin.email,
          role: admin.role
        },
        config.jwtSecret,
        { expiresIn: '24h' } // Longer expiration for admin
      );

      res.status(200).json({
        success: true,
        data: {
          token,
          admin: {
            _id: admin._id.toString(),
            email: admin.email,
            name: admin.name,
            role: admin.role
          }
        }
      });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to login'
      });
    }
  };

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const users = await this.userCrud.findAll(page, limit);
      const total = await this.userCrud.countAll();

      res.status(200).json({
        success: true,
        data: {
          users,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get users'
      });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid user ID'
        });
        return;
      }

      const user = await this.userCrud.findById(userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      // Get user's orders
      const orders = await this.userCrud.getUserOrders(userId);

      res.status(200).json({
        success: true,
        data: {
          user,
          orders
        }
      });
    } catch (error) {
      console.error('Get user details error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get user details'
      });
    }
  };

  getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as OrderStatus;
      const trackingNumber = req.query.tracking as string;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
      
      // Validate status if provided
      if (status && !ORDER_STATUSES.includes(status as any)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order status'
        });
        return;
      }

      // Validate dates if provided
      if ((startDate && isNaN(startDate.getTime())) || (endDate && isNaN(endDate.getTime()))) {
        res.status(400).json({
          success: false,
          message: 'Invalid date format. Use ISO 8601 format (YYYY-MM-DD)'
        });
        return;
      }

      // Validate date range
      if (startDate && endDate && startDate > endDate) {
        res.status(400).json({
          success: false,
          message: 'Start date cannot be after end date'
        });
        return;
      }
      
      const { orders, total } = await this.orderCrud.findAllOrders(page, limit, {
        status,
        trackingNumber,
        startDate,
        endDate
      });

      res.status(200).json({
        success: true,
        data: {
          orders,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error('Get all orders error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get orders'
      });
    }
  };

  updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderId } = req.params;
      const adminId = (req as any).adminId; // Get adminId from middleware
      const { status, notes } = req.body as { 
        status: OrderStatus;
        notes?: string;
      };

      // Validate status
      if (!ORDER_STATUSES.includes(status as any)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order status'
        });
        return;
      }

      // Update order status with notes
      const order = await this.orderCrud.adminUpdateOrderStatus(orderId, status, notes);
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      // Record the order status update in admin history
      await this.adminCrud.recordOrderAction(adminId, {
        orderId,
        status,
        notes,
        adminId // Add adminId to match IOrderStatusUpdate interface
      });

      try {
        // Send status update email based on user type
        if (order.userId) {
          const consumer = await this.consumerCrud.findById(order.userId);
          if (consumer) {
            await this.emailService.sendConsumerOrderStatusUpdate(
              {
                email: consumer.email,
                firstName: consumer.firstName
              },
              order,
              notes
            );
            // Record email notification in admin history
            await this.adminCrud.recordEmailNotification(
              adminId,
              orderId,
              'ORDER_STATUS_UPDATE'
            );
            console.log(`Status update email sent to consumer ${consumer.email} for order ${order.trackingNumber}`);
          }
        } else if (order.guestInfo) {
          // Handle guest order status updates
          await this.emailService.sendConsumerOrderStatusUpdate(
            {
              email: order.guestInfo.email,
              firstName: order.guestInfo.firstName
            },
            order,
            notes
          );
          // Record email notification in admin history
          await this.adminCrud.recordEmailNotification(
            adminId,
            orderId,
            'GUEST_ORDER_STATUS_UPDATE'
          );
          console.log(`Status update email sent to guest ${order.guestInfo.email} for order ${order.trackingNumber}`);
        }
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
        // Don't fail the request if email fails
      }

      res.status(200).json({
        success: true,
        data: {
          order,
          emailSent: true
        }
      });
    } catch (error) {
      console.error('Update order status error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order status'
      });
    }
  };

  getOrderStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const stats = await this.orderCrud.getOrderStats();
      
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Get order stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get order statistics'
      });
    }
  };

  getAllConsumers = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as 'active' | 'inactive';
      const search = req.query.search as string;

      const { consumers, total } = await this.consumerCrud.findAllConsumers(
        page,
        limit,
        { status, search }
      );

      res.status(200).json({
        success: true,
        data: {
          consumers,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error('Get all consumers error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get consumers'
      });
    }
  };

  getConsumerDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const { consumerId } = req.params;
      const consumer = await this.consumerCrud.findById(consumerId);

      if (!consumer) {
        res.status(404).json({
          success: false,
          message: 'Consumer not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: consumer
      });
    } catch (error) {
      console.error('Get consumer details error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get consumer details'
      });
    }
  };

  getConsumerOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const { consumerId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;

      // Validate consumerId
      if (!mongoose.Types.ObjectId.isValid(consumerId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid consumer ID'
        });
        return;
      }

      // Validate status if provided
      if (status && !ORDER_STATUSES.includes(status as any)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order status'
        });
        return;
      }

      const { orders, total } = await this.consumerCrud.findConsumerOrders(
        consumerId,
        page,
        limit,
        status
      );

      res.status(200).json({
        success: true,
        data: {
          orders,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error('Get consumer orders error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get consumer orders'
      });
    }
  };

  updateConsumerStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { consumerId } = req.params;
      const { status } = req.body as { status: 'active' | 'inactive' };

      const consumer = await this.consumerCrud.updateStatus(consumerId, status);
      if (!consumer) {
        res.status(404).json({
          success: false,
          message: 'Consumer not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: consumer
      });
    } catch (error) {
      console.error('Update consumer status error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update consumer status'
      });
    }
  };

  getConsumerStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const stats = await this.consumerCrud.getStats();
      
      if (!stats) {
        res.status(500).json({
          success: false,
          message: 'Failed to retrieve consumer statistics'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Get consumer stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get consumer statistics'
      });
    }
  };
}