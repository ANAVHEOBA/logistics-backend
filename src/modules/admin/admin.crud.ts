import { AdminSchema } from './admin.schema';
import { IAdmin, IAdminDocument, IAdminResponse, IOrderStatusUpdate } from './admin.model';
import { Types } from 'mongoose';

interface INotification {
  _id?: string;
  orderId: string;
  type: string;
  status: string;
  details: {
    orderNumber: string;
    amount: number;
    paymentReference: string;
    consumerName: string;
  };
  createdAt: Date;
}

interface IAdminWithNotifications extends IAdminDocument {
  notifications?: INotification[];
}

export class AdminCrud {
  async findByEmail(email: string): Promise<IAdminDocument | null> {
    try {
      return await AdminSchema.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  async updateLastLogin(adminId: string): Promise<void> {
    try {
      await AdminSchema.findByIdAndUpdate(adminId, {
        lastLoginAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  }

  async assignOrderToAdmin(adminId: string, orderId: string): Promise<void> {
    try {
      await AdminSchema.findByIdAndUpdate(adminId, {
        $push: { assignedOrders: orderId },
        $inc: { activeOrderCount: 1 }
      });
    } catch (error) {
      throw error;
    }
  }

  async recordOrderAction(adminId: string, orderUpdate: IOrderStatusUpdate): Promise<void> {
    try {
      await AdminSchema.findByIdAndUpdate(adminId, {
        $push: {
          orderHistory: {
            orderId: orderUpdate.orderId,
            action: 'STATUS_UPDATE',
            status: orderUpdate.status,
            notes: orderUpdate.notes,
            timestamp: new Date()
          }
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async completeOrder(adminId: string, orderId: string): Promise<void> {
    try {
      await AdminSchema.findByIdAndUpdate(adminId, {
        $pull: { assignedOrders: orderId },
        $inc: { activeOrderCount: -1 }
      });
    } catch (error) {
      throw error;
    }
  }

  private toAdminResponse(admin: IAdminDocument): IAdminResponse {
    const adminObj = admin.toObject();
    return {
      _id: adminObj._id.toString(),
      email: adminObj.email,
      name: adminObj.name,
      role: adminObj.role,
      lastLoginAt: adminObj.lastLoginAt,
      activeOrderCount: adminObj.activeOrderCount
    };
  }

  async createAdmin(adminData: Omit<IAdmin, '_id' | 'createdAt' | 'updatedAt' | 'lastLoginAt' | 'assignedOrders' | 'activeOrderCount' | 'orderHistory'>): Promise<IAdminDocument> {
    try {
      const admin = new AdminSchema({
        ...adminData,
        assignedOrders: [],
        activeOrderCount: 0,
        orderHistory: []
      });
      return await admin.save();
    } catch (error) {
      throw error;
    }
  }

  async getAdminStats(adminId: string) {
    try {
      const admin = await AdminSchema.findById(adminId);
      if (!admin) throw new Error('Admin not found');

      return {
        activeOrders: admin.activeOrderCount,
        totalOrdersHandled: admin.orderHistory.length,
        lastLogin: admin.lastLoginAt
      };
    } catch (error) {
      throw error;
    }
  }

  async recordEmailNotification(adminId: string, orderId: string, emailType: 'ORDER_STATUS_UPDATE' | 'GUEST_ORDER_STATUS_UPDATE'): Promise<void> {
    try {
      await AdminSchema.findByIdAndUpdate(adminId, {
        $push: {
          orderHistory: {
            orderId,
            action: 'EMAIL_SENT',
            type: emailType,
            timestamp: new Date()
          }
        }
      });
    } catch (error) {
      console.error('Failed to record email notification:', error);
      throw error;
    }
  }

  async createPaymentNotification(notification: {
    orderId: string;
    type: string;
    status: string;
    details: any;
  }): Promise<void> {
    // Should be modified to:
    const admins = await AdminSchema.find({ role: 'admin' });
    
    // Create notification for each relevant admin
    await Promise.all(
      admins.map(admin =>
        AdminSchema.findByIdAndUpdate(
          admin._id,
          {
            $push: {
              notifications: {
                ...notification,
                createdAt: new Date()
              }
            }
          }
        )
      )
    );
  }

  async getPaymentNotifications(
    adminId: string,
    page: number,
    limit: number
  ): Promise<{ notifications: INotification[]; total: number }> {
    const skip = (page - 1) * limit;
    
    const admin = await AdminSchema.findById(adminId) as IAdminWithNotifications;
    if (!admin) return { notifications: [], total: 0 };

    const notifications = admin.notifications || [];
    const paymentNotifications = notifications.filter((n: INotification) => n.type === 'NEW_PAYMENT');
    
    return {
      notifications: paymentNotifications.slice(skip, skip + limit),
      total: paymentNotifications.length
    };
  }

  async markNotificationRead(adminId: string, notificationId: string): Promise<void> {
    await AdminSchema.updateOne(
      { 
        _id: adminId,
        'notifications._id': notificationId 
      },
      {
        $set: {
          'notifications.$.status': 'READ'
        }
      }
    );
  }
} 