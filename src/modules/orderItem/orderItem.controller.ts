import { Request, Response } from 'express';
import { OrderItemCrud } from './orderItem.crud';
import { OrderItemStatus, RefundStatus } from './orderItem.model';
import { StoreCrud } from '../store/store.crud';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    _id: mongoose.Types.ObjectId;
  };
}

export class OrderItemController {
  private orderItemCrud: OrderItemCrud;
  private storeCrud: StoreCrud;

  constructor() {
    this.orderItemCrud = new OrderItemCrud();
    this.storeCrud = new StoreCrud();
  }

  getStoreOrderItems = async (req: AuthRequest, res: Response): Promise<void> => {
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

      const { page, limit, status } = req.query;
      const items = await this.orderItemCrud.findByStoreId(store._id.toString(), {
        page: Number(page),
        limit: Number(limit),
        status: status as OrderItemStatus
      });

      res.status(200).json({
        success: true,
        data: items
      });
    } catch (error) {
      console.error('Get store order items error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store order items'
      });
    }
  };

  getOrderItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderId } = req.params;
      const items = await this.orderItemCrud.findByOrderId(orderId);

      res.status(200).json({
        success: true,
        data: items
      });
    } catch (error) {
      console.error('Get order items error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get order items'
      });
    }
  };

  updateItemStatus = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const { itemId } = req.params;
      const { status } = req.body;

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const updatedItem = await this.orderItemCrud.updateStatus(itemId, status);
      if (!updatedItem) {
        res.status(404).json({
          success: false,
          message: 'Order item not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: updatedItem
      });
    } catch (error) {
      console.error('Update item status error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update item status'
      });
    }
  };

  initiateRefund = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const { itemId } = req.params;
      const { reason } = req.body;

      const store = await this.storeCrud.findByUserId(userId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const refundedItem = await this.orderItemCrud.initiateRefund(itemId, reason);
      if (!refundedItem) {
        res.status(404).json({
          success: false,
          message: 'Order item not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: refundedItem
      });
    } catch (error) {
      console.error('Initiate refund error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to initiate refund'
      });
    }
  };

  getStoreStats = async (req: AuthRequest, res: Response): Promise<void> => {
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

      const stats = await this.orderItemCrud.getStoreOrderItemStats(store._id.toString());

      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Get store stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store stats'
      });
    }
  };
} 