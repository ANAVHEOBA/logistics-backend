import { Request, Response } from 'express';
import { AdminCrud } from './admin.crud';
import { UserCrud } from '../user/user.crud';
import { IAdminLoginRequest, IAdminDocument } from './admin.model';
import jwt from 'jsonwebtoken';
import { config } from '../../config/environment';
import mongoose from 'mongoose';
import { OrderCrud } from '../order/order.crud';
import { OrderStatus, PaymentStatus } from '../order/order.model';
import { EmailService } from '../../services/email.service';
import { ConsumerCrud } from '../consumer/consumer.crud';
import { StoreCrud } from '../store/store.crud';
import { StoreStatus, StoreCategory } from '../store/store.model';
import { Store } from '../store/store.model';
import { ProductCrud } from '../product/product.crud';

// Define the valid order statuses
const ORDER_STATUSES = [
  'PENDING',
  'CONFIRMED',
  'READY_FOR_PICKUP',
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
  private storeCrud: StoreCrud;
  private productCrud: ProductCrud;

  constructor() {
    this.adminCrud = new AdminCrud();
    this.userCrud = new UserCrud();
    this.orderCrud = new OrderCrud();
    this.emailService = new EmailService();
    this.consumerCrud = new ConsumerCrud();
    this.storeCrud = new StoreCrud();
    this.productCrud = new ProductCrud();
  }

  createFirstAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      // Check if any admin exists
      const existingAdmin = await this.adminCrud.findByEmail('africgoa2z@gmail.com');
      if (existingAdmin) {
        res.status(400).json({
          success: false,
          message: 'Admin already exists'
        });
        return;
      }

      const adminData = {
        email: 'africgoa2z@gmail.com',
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

  verifyPayment = async (req: Request, res: Response): Promise<void> => {
    try {
      const adminId = req.admin!.adminId;
      const { orderId } = req.params;
      const { verified, notes } = req.body;
      
      if (verified === undefined) {
        res.status(400).json({
          success: false,
          message: 'Verification status is required'
        });
        return;
      }
      
      const paymentStatus: PaymentStatus = verified ? 'VERIFIED' : 'FAILED';
      const statusNote = `Payment ${verified ? 'verified' : 'rejected'} by admin: ${adminId}`;
      
      const order = await this.orderCrud.updatePaymentStatus(
        orderId, 
        paymentStatus, 
        notes || statusNote,
        adminId
      );
      
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }
      
      // If payment is verified, update order status to CONFIRMED
      if (verified) {
        await this.orderCrud.adminUpdateOrderStatus(
          orderId,
          'CONFIRMED' as OrderStatus,
          notes || statusNote
        );
      }
      
      // Send notification to consumer
      try {
        if (order.userId) {
          const consumer = await this.consumerCrud.findById(order.userId);
          if (consumer) {
            await this.emailService.sendPaymentVerificationEmail(
              {
                email: consumer.email,
                firstName: consumer.firstName
              },
              order,
              verified,
              notes
            );
          }
        }
      } catch (emailError) {
        console.error('Failed to send payment verification email:', emailError);
      }
      
      res.status(200).json({
        success: true,
        data: {
          message: `Payment ${verified ? 'verified' : 'rejected'} successfully`,
          order
        }
      });
    } catch (error) {
      console.error('Verify payment error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to verify payment'
      });
    }
  };

  getPendingPayments = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const { orders, total } = await this.orderCrud.findOrdersByPaymentStatus(
        'PENDING',
        page,
        limit
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
      console.error('Get pending payments error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get pending payments'
      });
    }
  };

  getOrderReceipts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderId } = req.params;

      // Validate orderId
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order ID'
        });
        return;
      }

      // Get order with populated data
      const order = await this.orderCrud.findById(orderId);
      
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      // Get consumer details if order has a userId
      let consumerDetails = null;
      if (order.userId) {
        const consumer = await this.consumerCrud.findById(order.userId);
        if (consumer) {
          consumerDetails = {
            name: `${consumer.firstName} ${consumer.lastName}`,
            email: consumer.email,
            phone: consumer.phone,
            isGuest: false
          };
        }
      } else if (order.guestInfo) {
        consumerDetails = {
          name: `${order.guestInfo.firstName} ${order.guestInfo.lastName}`,
          email: order.guestInfo.email,
          phone: order.guestInfo.phone,
          isGuest: true
        };
      }

      // Get product and store details for each item
      const itemsWithDetails = await Promise.all(
        order.items.map(async (item) => {
          const product = await this.productCrud.getProductById(item.productId);
          const store = await this.storeCrud.findById(item.storeId);
          
          return {
            ...item,
            productName: product?.name || 'Product not found',
            productDescription: product?.description,
            store: store ? {
              storeName: store.storeName,
              storeId: store._id,
              contactInfo: store.contactInfo
            } : null
          };
        })
      );

      // Calculate price breakdown
      const productTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const deliveryFee = order.zonePrice || 0;
      const totalPrice = productTotal + deliveryFee;

      // Return comprehensive order details
      res.status(200).json({
        success: true,
        data: {
          orderId: order._id,
          trackingNumber: order.trackingNumber,
          status: order.status,
          createdAt: order.createdAt,
          consumer: consumerDetails,
          items: itemsWithDetails,
          deliveryDetails: {
            pickupAddress: order.pickupAddress,
            deliveryAddress: order.deliveryAddress,
            packageSize: order.packageSize,
            isExpressDelivery: order.isExpressDelivery,
            estimatedDeliveryDate: order.estimatedDeliveryDate
          },
          paymentDetails: {
            status: order.paymentStatus,
            method: order.paymentMethod,
            reference: order.paymentReference,
            receipts: order.paymentReceipts || [],
            priceBreakdown: {
              productTotal,
              deliveryFee,
              total: totalPrice
            }
          }
        }
      });
    } catch (error) {
      console.error('Get order receipts error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get order receipts'
      });
    }
  };

  getAllStores = async (req: Request, res: Response): Promise<void> => {
    try {
      const { 
        page = 1, 
        limit = 10, 
        search,
        category,
        status,
        minRevenue,
        maxRevenue,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      const stores = await this.storeCrud.listAdminStores({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        category: category as StoreCategory,
        status: status as StoreStatus,
        minRevenue: minRevenue ? Number(minRevenue) : undefined,
        maxRevenue: maxRevenue ? Number(maxRevenue) : undefined,
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc'
      });

      res.status(200).json({
        success: true,
        data: stores
      });
    } catch (error) {
      console.error('Get all stores error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve stores'
      });
    }
  };

  updateStoreStatus = async (req: Request, res: Response): Promise<void> => {
    const { storeId } = req.params;  // Extracting storeId from URL parameters
    const { status }: { status: StoreStatus } = req.body;

    if (!Object.values(StoreStatus).includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    try {
      // Find the store by its ID and update the status
      const store = await Store.findByIdAndUpdate(
        storeId, 
        { status },
        { new: true } // Return the updated store
      );

      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
      }

      // Respond with the updated store data
      res.status(200).json({
        success: true,
        data: store
      });
    } catch(e) {
      console.error('Update store status error:', e);
       res.status(500).json({
        success: false,
        message: 'Failed to update store status'
      });
    }
  }

  getReadyForPickupOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const { orders, total } = await this.orderCrud.findOrdersByStatus(
        'READY_FOR_PICKUP',
        page,
        limit
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
      console.error('Get ready for pickup orders error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get ready for pickup orders'
      });
    }
  };

  getPaymentNotifications = async (req: Request, res: Response): Promise<void> => {
    try {
      const adminId = req.admin!.adminId;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const notifications = await this.adminCrud.getPaymentNotifications(
        adminId,
        page,
        limit
      );

      res.status(200).json({
        success: true,
        data: notifications
      });
    } catch (error) {
      console.error('Get payment notifications error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get payment notifications'
      });
    }
  };

  markNotificationRead = async (req: Request, res: Response): Promise<void> => {
    try {
      const adminId = req.admin!.adminId;
      const { notificationId } = req.params;

      await this.adminCrud.markNotificationRead(adminId, notificationId);

      res.status(200).json({
        success: true,
        message: 'Notification marked as read'
      });
    } catch (error) {
      console.error('Mark notification read error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to mark notification as read'
      });
    }
  };

  getStoreMetricsById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { storeId } = req.params;

      // Validate storeId
      if (!mongoose.Types.ObjectId.isValid(storeId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid store ID'
        });
        return;
      }

      const store = await Store.findById(storeId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Get all metrics at once
      const [metrics, revenue, performance] = await Promise.all([
        this.storeCrud.getAdminStoreMetrics(storeId),
        this.storeCrud.getStoreRevenue(storeId),
        this.storeCrud.getProductPerformance(storeId)
      ]);

      res.status(200).json({
        success: true,
        data: {
          basicMetrics: metrics,
          revenue,
          performance,
          storeInfo: {
            name: store.storeName,
            status: store.status,
            category: store.category,
            createdAt: store.createdAt
          }
        }
      });
    } catch (error) {
      console.error('Get store metrics error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store metrics'
      });
    }
  };

  getStoreDashboardById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { storeId } = req.params;
      
      const [revenue, productPerformance, recentOrders] = await Promise.all([
        this.storeCrud.getStoreRevenue(storeId),
        this.storeCrud.getProductPerformance(storeId),
        this.storeCrud.getStoreOrders(storeId, { limit: 5 })
      ]);

      res.status(200).json({
        success: true,
        data: {
          stats: {
            revenue,
            orders: recentOrders.total
          },
          recentOrders: recentOrders.data,
          topProducts: productPerformance
        }
      });
    } catch (error) {
      console.error('Get store dashboard error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store dashboard'
      });
    }
  };

  getStoreRevenueById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { storeId } = req.params;

      // Validate storeId
      if (!mongoose.Types.ObjectId.isValid(storeId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid store ID'
        });
        return;
      }

      const store = await Store.findById(storeId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Get revenue data with optional date range
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      const revenue = await this.storeCrud.getStoreRevenue(storeId, {
        startDate,
        endDate
      });

      res.status(200).json({
        success: true,
        data: {
          revenue,
          storeInfo: {
            name: store.storeName,
            id: store._id
          }
        }
      });
    } catch (error) {
      console.error('Get store revenue error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store revenue'
      });
    }
  };

  getStorePerformanceById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { storeId } = req.params;

      // Validate storeId
      if (!mongoose.Types.ObjectId.isValid(storeId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid store ID'
        });
        return;
      }

      const store = await Store.findById(storeId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Get performance metrics
      const performance = await this.storeCrud.getProductPerformance(storeId);

      res.status(200).json({
        success: true,
        data: {
          performance,
          storeInfo: {
            name: store.storeName,
            id: store._id
          }
        }
      });
    } catch (error) {
      console.error('Get store performance error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store performance'
      });
    }
  };

  getStorePaymentDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const { storeId } = req.params;

      // Validate storeId
      if (!mongoose.Types.ObjectId.isValid(storeId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid store ID'
        });
        return;
      }

      const store = await this.storeCrud.findById(storeId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          storeId: store._id,
          storeName: store.storeName,
          paymentDetails: store.paymentDetails || {},
          contactInfo: store.contactInfo
        }
      });
    } catch (error) {
      console.error('Get store payment details error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store payment details'
      });
    }
  };

  updateStoreOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { storeId } = req.params;
      const { displayOrder, isFeatured, featuredUntil, adminNotes } = req.body;

      const store = await this.storeCrud.updateStoreOrder(storeId, {
        displayOrder,
        isFeatured,
        featuredUntil,
        adminNotes
      });

      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: store
      });
    } catch (error) {
      console.error('Update store order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update store order'
      });
    }
  };

  bulkUpdateStoreOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { stores } = req.body; // Array of { storeId, displayOrder }
      
      if (!Array.isArray(stores)) {
        res.status(400).json({
          success: false,
          message: 'Invalid request format. Expected array of stores'
        });
        return;
      }

      await this.storeCrud.bulkUpdateStoreOrder(stores);

      res.status(200).json({
        success: true,
        message: 'Store order updated successfully'
      });
    } catch (error) {
      console.error('Bulk update store order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update store order'
      });
    }
  };

  updateFcmToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const adminId = req.admin!.adminId;
      const { fcmToken } = req.body;

      if (!fcmToken) {
        res.status(400).json({
          success: false,
          message: 'FCM token is required'
        });
        return;
      }

      // Basic token validation (should be a non-empty string)
      if (typeof fcmToken !== 'string' || fcmToken.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Invalid FCM token format'
        });
        return;
      }

      const admin = await this.adminCrud.updateFcmToken(adminId, fcmToken);
      
      if (!admin) {
        res.status(404).json({
          success: false,
          message: 'Admin not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'FCM token updated successfully'
      });
    } catch (error) {
      console.error('Update FCM token error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update FCM token'
      });
    }
  };

  async initializeAdmin(): Promise<IAdminDocument | null> {
    try {
      // Check if admin already exists
      const existingAdmin = await this.adminCrud.findByEmail('africgoa2z@gmail.com');
      
      if (existingAdmin) {
        console.log('Admin already exists');
        return existingAdmin;
      }

      // Create default admin if none exists
      const adminData = {
        email: 'africgoa2z@gmail.com',
        password: 'admin123', // This will be hashed by the schema
        name: 'System Admin',
        role: 'admin' as const
      };

      const admin = await this.adminCrud.createAdmin(adminData);
      return admin;
    } catch (error) {
      console.error('Error initializing admin:', error);
      throw error;
    }
  }

  openStore = async (req: Request, res: Response): Promise<void> => {
    try {
      const { storeId } = req.params;

      // Validate storeId
      if (!mongoose.Types.ObjectId.isValid(storeId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid store ID'
        });
        return;
      }

      const store = await this.storeCrud.findById(storeId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }
      store.openStore()

      res.status(200).json({
        success: true,
        message: "store opened successfully"
      });
    } catch (error) {
      console.error('Open store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to open store'
      })
    }
  };

  closeStore = async (req: Request, res: Response): Promise<void> => {
    try {
      const { storeId } = req.params;

      // Validate storeId
      if (!mongoose.Types.ObjectId.isValid(storeId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid store ID'
        })
      }

      const store = await this.storeCrud.findById(storeId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }
      store.closeStore()

      res.status(200).json({
        success: true,
        message: "store closed successfully"
      });
    } catch (error) {
      console.error('Closed store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to close store'
      })
    };
  }
}
