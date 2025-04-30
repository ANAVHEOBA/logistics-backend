import { Request, Response } from 'express';
import { StoreCrud } from './store.crud';
import { StoreStatus, StoreCategory, IStore } from './store.model';
import { ProductCrud } from '../product/product.crud';
import { Types } from 'mongoose';
import { OrderCrud } from '../order/order.crud';
import { EmailService } from '../../services/email.service';  
import { ICreateGuestOrderRequest } from '../order/order.model';
import mongoose from 'mongoose';
import { AddressCrud } from '../address/address.crud';
import { ICreateAddressRequest } from '../address/address.model';
import { PaginationOptions, PaginatedResponse, StoreOrder } from './store.types';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// First, update the AuthRequest interface to be more explicit
interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    _id: Types.ObjectId;  // Using Types from mongoose
  };
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer memory storage
const storage = multer.memoryStorage();
export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export class StoreController {
  private storeCrud: StoreCrud;
  private productCrud: ProductCrud;
  private orderCrud: OrderCrud;
  private emailService: EmailService;
  private addressCrud: AddressCrud;

  constructor() {
    this.storeCrud = new StoreCrud();
    this.productCrud = new ProductCrud();
    this.orderCrud = new OrderCrud();
    this.emailService = new EmailService();
    this.addressCrud = new AddressCrud();
  }

  createStore = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }
      
      const existingStore = await this.storeCrud.findByUserId(userId);
      if (existingStore) {
        res.status(400).json({
          success: false,
          message: 'User already has a store'
        });
        return;
      }

      // Check if store name is unique
      const existingStoreName = await this.storeCrud.findByStoreName(req.body.storeName);
      if (existingStoreName) {
        res.status(400).json({
          success: false,
          message: 'Store name already taken'
        });
        return;
      }

      // Create store with initial status
      const storeData = {
        ...req.body,
        userId: new mongoose.Types.ObjectId(userId),
        status: StoreStatus.PENDING,
        settings: {
          isVerified: false,
          isFeaturedStore: false,
          allowRatings: true
        },
        metrics: {
          totalOrders: 0,
          totalProducts: 0,
          totalRevenue: 0
        }
      };

      const store = await this.storeCrud.createStore(storeData);

      res.status(201).json({
        success: true,
        data: store
      });
    } catch (error) {
      console.error('Create store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create store'
      });
    }
  };

  getMyStore = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // Use userId instead of _id
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      console.log('Searching for store with userId:', userId);
      const store = await this.storeCrud.findByUserId(userId);
      
      console.log('Store found:', store);

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
      console.error('Get store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  updateStore = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }
      const store = await this.storeCrud.findByUserId(userId);

      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Convert ObjectId to string for updateStore
      const updatedStore = await this.storeCrud.updateStore(
        store._id.toString(),
        req.body
      );

      res.status(200).json({
        success: true,
        data: updatedStore
      });
    } catch (error) {
      console.error('Update store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update store'
      });
    }
  };

  getStoreDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }
  
      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }
  
      const [revenue, productPerformance, recentOrders] = await Promise.all([
        this.storeCrud.getStoreRevenue(store._id.toString()),
        this.storeCrud.getProductPerformance(store._id.toString()),
        this.storeCrud.getStoreOrders(store._id.toString(), { limit: 5 })
      ]);
  
      res.status(200).json({
        success: true,
        data: {
          stats: {
            revenue,
            orders: recentOrders.total  // Changed from recentOrders.pagination.total
          },
          recentOrders: recentOrders.data,  // Changed from recentOrders.orders
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

  getPublicStore = async (req: Request, res: Response): Promise<void> => {
    try {
      const { slug } = req.params;
      const store = await this.storeCrud.getPublicStoreData(slug);

      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Get the store URL using the method
      const storeUrl = process.env.NODE_ENV === 'development'
        ? `http://localhost:5000/store/${store.slug}`
        : `https://yourapp.com/store/${store.slug}`;

      res.status(200).json({
        success: true,
        data: {
          store: {
            ...store.toJSON(),
            storeUrl
          },
          isOpen: this.isStoreCurrentlyOpen(store)
        }
      });
    } catch (error) {
      console.error('Get public store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store details'
      });
    }
  };

  getStoreProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { slug } = req.params;
      const { page = 1, limit = 20, category } = req.query;

      const store = await this.storeCrud.findBySlug(slug || '');
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Use productCrud instead of productService
      const products = await this.productCrud.getStoreProducts(
        store._id.toString(),
        {
          page: Number(page),
          limit: Number(limit),
          category: category as string
        }
      );

      res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      console.error('Get store products error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store products'
      });
    }
  };

  deleteStore = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const deleted = await this.storeCrud.deleteStore(userId);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Store deleted successfully'
      });
    } catch (error) {
      console.error('Delete store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete store'
      });
    }
  };

  getStoreMetrics = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const metrics = await this.storeCrud.getStoreMetrics(store._id.toString());
      
      res.status(200).json({
        success: true,
        data: metrics
      });
    } catch (error) {
      console.error('Get store metrics error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store metrics'
      });
    }
  };

  updateStoreSettings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const updatedStore = await this.storeCrud.updateStore(
        store._id.toString(),
        { settings: req.body.settings }
      );

      res.status(200).json({
        success: true,
        data: updatedStore
      });
    } catch (error) {
      console.error('Update store settings error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update store settings'
      });
    }
  };

  activateStore = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const activatedStore = await this.storeCrud.activateStore(store._id.toString());

      res.status(200).json({
        success: true,
        data: activatedStore
      });
    } catch (error) {
      console.error('Activate store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to activate store'
      });
    }
  };

  createGuestOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { slug } = req.params;
      const orderData = req.body as ICreateGuestOrderRequest;

      // Validate store exists and is active
      const store = await this.storeCrud.findBySlug(slug);
      if (!store || store.status !== StoreStatus.ACTIVE) {
        res.status(404).json({
          success: false,
          message: 'Store not found or inactive'
        });
        return;
      }

      // Validate items exist
      if (!orderData.items?.length) {
        res.status(400).json({
          success: false,
          message: 'Order must contain at least one item'
        });
        return;
      }

      // Fetch and validate all products first
      const itemsWithDetails = await Promise.all(
        orderData.items.map(async (item) => {
          const product = await this.productCrud.getProductById(item.productId);
          if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
          }
          // Create a new object with all required fields
          return {
            productId: item.productId,
            storeId: store._id.toString(),
            quantity: item.quantity,
            price: item.price || product.price,
            name: product.name, // Use product name from database
            variantData: item.variantData || []
          };
        })
      );

      // Create order with store's address as pickup and complete item details
      const modifiedOrderData: ICreateGuestOrderRequest = {
        guestInfo: orderData.guestInfo,
        deliveryAddress: orderData.deliveryAddress,
        pickupAddress: {
          ...store.address,
          recipientName: store.storeName,
          recipientPhone: store.contactInfo.phone
        },
        items: itemsWithDetails,
        packageSize: orderData.packageSize || 'SMALL',
        isFragile: orderData.isFragile || false,
        isExpressDelivery: orderData.isExpressDelivery || false,
        requiresSpecialHandling: orderData.requiresSpecialHandling || false,
        specialInstructions: orderData.specialInstructions
      };

      // Create the order
      const order = await this.orderCrud.createGuestOrder(modifiedOrderData);
      
      // Send confirmation email
      await this.emailService.sendGuestOrderConfirmation(
        orderData.guestInfo.email,
        order
      );

      res.status(201).json({
        success: true,
        data: {
          order,
          trackingUrl: `${process.env.FRONTEND_URL}/track/${order.trackingNumber}`
        }
      });

    } catch (error) {
      console.error('Create guest order error:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create order'
      });
    }
  };

  private calculateSetupCompletion(store: IStore): number {
    const requiredFields = [
      'storeName',
      'description',
      'category',
      'contactInfo.email',
      'contactInfo.phone',
      'address'
    ];

    const completedFields = requiredFields.filter(field => {
      // Safe navigation through nested objects
      return field.split('.').reduce((obj: any, key) => obj && obj[key], store) !== undefined;
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  }

  private isStoreCurrentlyOpen(store: IStore): boolean {
    // Implement store hours check logic here
    return true; // Placeholder
  }

  listStores = async (req: Request, res: Response): Promise<void> => {
    try {
      const { 
        page = 1, 
        limit = 10, 
        search, 
        category,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        city,
        state,
        country,
        minRating
      } = req.query;

      const filter: any = {
        status: StoreStatus.ACTIVE
      };

      // Add search filter
      if (search) {
        filter.$or = [
          { storeName: { $regex: search as string, $options: 'i' } },
          { description: { $regex: search as string, $options: 'i' } }
        ];
      }

      // Add category filter
      if (category) {
        filter.category = category;
      }

      // Add location filters
      if (city) {
        filter['address.city'] = city;
      }
      if (state) {
        filter['address.state'] = state;
      }
      if (country) {
        filter['address.country'] = country;
      }

      // Add rating filter if needed
      if (minRating) {
        filter['metrics.averageRating'] = { $gte: Number(minRating) };
      }

      const stores = await this.storeCrud.listStores({
        filter,
        page: Number(page),
        limit: Number(limit),
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc'
      });

      res.status(200).json({
        success: true,
        data: {
          stores: stores.stores,
          pagination: stores.pagination
        }
      });
    } catch (error) {
      console.error('List stores error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to list stores'
      });
    }
  };

  addStoreAddress = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      // First, check if user has a store
      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found. Please create a store first'
        });
        return;
      }

      // Create address for the store
      const addressData: ICreateAddressRequest = {
        ...req.body,
        label: 'Store Address',
        isDefault: true
      };

      const storeAddress = await this.addressCrud.createAddress(userId, addressData);

      res.status(201).json({
        success: true,
        data: {
          address: storeAddress
        }
      });
    } catch (error) {
      console.error('Add store address error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to add store address'
      });
    }
  };

  updateStoreAddress = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      // First, check if user has a store
      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Find the existing store address
      const addresses = await this.addressCrud.findUserAddresses(userId);
      const storeAddress = addresses.find(addr => addr.label === 'Store Address');

      if (!storeAddress) {
        res.status(404).json({
          success: false,
          message: 'Store address not found. Please add a store address first'
        });
        return;
      }

      // Update the address
      const updatedAddress = await this.addressCrud.updateAddress(
        storeAddress._id,
        userId,
        {
          ...req.body,
          label: 'Store Address',
          isDefault: true
        }
      );

      res.status(200).json({
        success: true,
        data: {
          address: updatedAddress
        }
      });
    } catch (error) {
      console.error('Update store address error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update store address'
      });
    }
  };

  getStoreOrders = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const { page = 1, limit = 10, status } = req.query;
      const paginationOptions: PaginationOptions = {
        page: Number(page),
        limit: Number(limit),
        status: status as string
      };

      const response = await this.storeCrud.getStoreOrders(
        store._id.toString(),
        paginationOptions
      );

      res.status(200).json({
        success: true,
        data: {
          orders: response.data,
          pagination: {
            total: response.total,
            page: response.page,
            totalPages: response.totalPages
          }
        }
      });
    } catch (error) {
      console.error('Get store orders error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store orders'
      });
    }
  };

  getStoreOrderDetails = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      const { orderId } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const order = await this.storeCrud.getStoreOrderDetails(
        store._id.toString(),
        orderId
      );

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
      console.error('Get store order details error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get order details'
      });
    }
  };

  markOrderReady = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      const { orderId } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Get current order to check status
      const currentOrder = await this.orderCrud.findById(orderId);
      if (!currentOrder) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      // Validate order status transition
      if (currentOrder.status !== 'PENDING' && currentOrder.status !== 'CONFIRMED') {
        res.status(400).json({
          success: false,
          message: `Cannot mark order as ready. Current status: ${currentOrder.status}`
        });
        return;
      }

      // Update order status to READY_FOR_PICKUP
      const order = await this.storeCrud.updateOrderReadyStatus(
        store._id.toString(),
        orderId,
        true
      );

      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      // Send notification to admin about the order being ready for pickup
      await this.emailService.sendStoreOrderNotification(
        store.contactInfo.email,
        order,
        order.items
      );

      res.status(200).json({
        success: true,
        message: 'Order marked as ready for pickup',
        data: order
      });
    } catch (error) {
      console.error('Mark order ready error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to mark order as ready'
      });
    }
  };

  getStoreRevenue = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Get basic revenue stats
      const revenue = await this.storeCrud.getStoreRevenue(store._id.toString());

      // If detailed analysis is requested
      const { startDate, endDate } = req.query;
      let detailedRevenue;
      if (startDate && endDate) {
        detailedRevenue = await this.storeCrud.getDetailedRevenue(
          store._id.toString(),
          new Date(startDate as string),
          new Date(endDate as string)
        );
      }

      res.status(200).json({
        success: true,
        data: {
          summary: revenue,
          details: detailedRevenue
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

  getProductPerformance = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const performance = await this.storeCrud.getProductPerformance(store._id.toString());

      res.status(200).json({
        success: true,
        data: performance
      });
    } catch (error) {
      console.error('Get product performance error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get product performance'
      });
    }
  };

  getStoreCustomers = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      // Get store for this user
      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Get pagination parameters
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      // Get customers
      const { customers, total } = await this.storeCrud.getStoreCustomers(
        store._id.toString(),
        page,
        limit
      );

      res.status(200).json({
        success: true,
        data: {
          customers,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error('Get store customers error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store customers'
      });
    }
  };

  uploadStoreImage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      if (!req.file) {
        res.status(400).json({
          success: false,
          message: 'No image file provided'
        });
        return;
      }

      // Delete old image if exists
      if (store.image?.publicId) {
        await cloudinary.uploader.destroy(store.image.publicId);
      }

      // Convert buffer to base64
      const base64Image = req.file.buffer.toString('base64');
      const dataUri = `data:${req.file.mimetype};base64,${base64Image}`;

      // Upload new image
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'stores',
        transformation: [
          { width: 800, height: 400, crop: 'fill' }
        ]
      });

      // Update store with new image
      const updatedStore = await this.storeCrud.updateStore(store._id.toString(), {
        image: {
          url: result.secure_url,
          publicId: result.public_id
        }
      });

      if (!updatedStore) {
        throw new Error('Failed to update store');
      }

      res.status(200).json({
        success: true,
        data: {
          image: updatedStore.image
        }
      });
    } catch (error) {
      console.error('Upload store image error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload store image'
      });
    }
  };

  addPaymentDetails = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const { accountName, accountNumber, bankName } = req.body;

      // Validate required fields
      if (!accountName || !accountNumber || !bankName) {
        res.status(400).json({
          success: false,
          message: 'Account name, account number, and bank name are required'
        });
        return;
      }

      const updatedStore = await this.storeCrud.updateStore(store._id.toString(), {
        paymentDetails: {
          accountName,
          accountNumber,
          bankName
        }
      });

      if (!updatedStore) {
        res.status(500).json({
          success: false,
          message: 'Failed to update store payment details'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          paymentDetails: updatedStore.paymentDetails
        }
      });
    } catch (error) {
      console.error('Add payment details error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to add payment details'
      });
    }
  };

  updatePaymentDetails = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const { accountName, accountNumber, bankName } = req.body;

      // Validate at least one field is provided
      if (!accountName && !accountNumber && !bankName) {
        res.status(400).json({
          success: false,
          message: 'At least one field is required for update'
        });
        return;
      }

      const currentPaymentDetails = store.paymentDetails || {};
      const updatedStore = await this.storeCrud.updateStore(store._id.toString(), {
        paymentDetails: {
          accountName: accountName || currentPaymentDetails.accountName,
          accountNumber: accountNumber || currentPaymentDetails.accountNumber,
          bankName: bankName || currentPaymentDetails.bankName
        }
      });

      if (!updatedStore) {
        res.status(500).json({
          success: false,
          message: 'Failed to update store payment details'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          paymentDetails: updatedStore.paymentDetails
        }
      });
    } catch (error) {
      console.error('Update payment details error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update payment details'
      });
    }
  };

  getPaymentDetails = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId);
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
          paymentDetails: store.paymentDetails || {}
        }
      });
    } catch (error) {
      console.error('Get payment details error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get payment details'
      });
    }
  };




  //set up a store method

  setupStore = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }
  
      // Check if user already has a store
      const existingStore = await this.storeCrud.findByUserId(userId);
      if (existingStore) {
        res.status(400).json({
          success: false,
          message: 'User already has a store'
        });
        return;
      }
  
      // Create store with initial status
      const storeData = {
        ...req.body,
        userId: new mongoose.Types.ObjectId(userId),
        status: StoreStatus.PENDING,
        settings: {
          isVerified: false,
          isFeaturedStore: false,
          allowRatings: true
        },
        metrics: {
          totalOrders: 0,
          totalProducts: 0,
          totalRevenue: 0
        }
      };
  
      const store = await this.storeCrud.createStore(storeData);
  
      res.status(201).json({
        success: true,
        data: store
      });
    } catch (error) {
      console.error('Setup store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to setup store'
      });
    }
  };
} 