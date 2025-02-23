import { Request, Response } from 'express';
import { StoreCrud } from './store.crud';
import { StoreStatus, StoreCategory, IStore } from './store.model';
import { ProductCrud } from '../product/product.crud';
import { Types } from 'mongoose';
import { OrderCrud } from '../order/order.crud';
import { EmailService } from '../../services/email.service';  
import { ICreateGuestOrderRequest } from '../order/order.model';
import mongoose from 'mongoose';

// First, update the AuthRequest interface to be more explicit
interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    _id: Types.ObjectId;  // Using Types from mongoose
  };
}

export class StoreController {
  private storeCrud: StoreCrud;
  private productCrud: ProductCrud;
  private orderCrud: OrderCrud;
  private emailService: EmailService;

  constructor() {
    this.storeCrud = new StoreCrud();
    this.productCrud = new ProductCrud();
    this.orderCrud = new OrderCrud();
    this.emailService = new EmailService();
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

      // Get store metrics and other dashboard data
      const metrics = await this.storeCrud.getStoreMetrics(store._id.toString());

      res.status(200).json({
        success: true,
        data: {
          store,
          metrics,
          setupCompletion: this.calculateSetupCompletion(store)
        }
      });
    } catch (error) {
      console.error('Get dashboard error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get dashboard data'
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
} 