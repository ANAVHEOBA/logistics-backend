import { Request, Response } from 'express';
import { StoreCrud } from './store.crud';
import { StoreStatus, StoreCategory } from './store.model';

export class StoreController {
  private storeCrud: StoreCrud;

  constructor() {
    this.storeCrud = new StoreCrud();
  }

  createStore = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId; // From auth middleware
      
      // Check if user already has a store
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
        userId,
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

  getMyStore = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
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
        data: store
      });
    } catch (error) {
      console.error('Get store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store'
      });
    }
  };

  updateStore = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      const store = await this.storeCrud.findByUserId(userId);

      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Update store data
      const updatedStore = await this.storeCrud.updateStore(store._id, req.body);

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

  getStoreDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      const store = await this.storeCrud.findByUserId(userId);

      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Get store metrics and other dashboard data
      const metrics = await this.storeCrud.getStoreMetrics(store._id);

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

  private calculateSetupCompletion(store: any): number {
    const requiredFields = [
      'storeName',
      'description',
      'category',
      'contactInfo.email',
      'contactInfo.phone',
      'address'
    ];

    const completedFields = requiredFields.filter(field => {
      const value = field.split('.').reduce((obj, key) => obj?.[key], store);
      return value !== undefined && value !== '';
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  }
} 