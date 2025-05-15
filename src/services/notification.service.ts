import { messaging } from '../config/firebase/firebase';
import { IOrder, OrderStatus } from '../modules/order/order.model';
import { AdminSchema } from '../modules/admin/admin.schema';
import { EmailService } from './email.service';
import { UserSchema } from '../modules/user/user.schema';
import { StoreSchema } from '../modules/store/store.schema';
import { IUser } from '../modules/user/user.model';
import { IOrderItemResponse } from '../modules/orderItem/orderItem.model';
import { IStore } from '../modules/store/store.model';
import mongoose from 'mongoose';

interface IPopulatedOrder extends Omit<IOrder, 'userId' | 'items'> {
  userId?: {
    _id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  };
  items: Array<IOrderItemResponse & {
    storeId?: {
      _id: string;
      email?: string;
      storeName?: string;
    };
  }>;
}

type LeanStore = {
  _id: mongoose.Types.ObjectId;
  storeName: string;
  contactInfo: {
    email: string;
    phone: string;
    whatsapp?: string;
  };
};

export class NotificationService {
  private static emailService: EmailService = new EmailService();

  private static async populateOrderData(order: IOrder): Promise<IPopulatedOrder> {
    // Get user details if available
    let populatedUser;
    if (order.userId) {
      populatedUser = await UserSchema.findById(order.userId)
        .select('firstName lastName email phone')
        .lean();
    }

    // Get store details for each item
    const populatedItems = await Promise.all(
      order.items.map(async (item) => {
        const store = await StoreSchema.findById(item.storeId)
          .select('storeName contactInfo')
          .lean() as LeanStore | null;

        return {
          ...item,
          storeId: {
            _id: store?._id.toString() || item.storeId.toString(),
            email: store?.contactInfo?.email,
            storeName: store?.storeName
          }
        };
      })
    );

    return {
      ...order,
      userId: populatedUser,
      items: populatedItems
    } as IPopulatedOrder;
  }

  static async sendNewOrderNotification(order: IOrder) {
    try {
      // Get all admin FCM tokens
      const admins = await AdminSchema.find({ fcmToken: { $exists: true } });
      const tokens = admins
        .map(admin => admin.fcmToken)
        .filter((token): token is string => Boolean(token));

      if (tokens.length === 0) return;

      const message = {
        notification: {
          title: 'New Order Received',
          body: `Order #${order.trackingNumber} has been placed`
        },
        data: {
          orderId: order._id,
          trackingNumber: order.trackingNumber,
          status: order.status,
          type: 'NEW_ORDER'
        },
        tokens: tokens
      };

      const response = await messaging.sendEachForMulticast(message);
      console.log('Notification sent:', response);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  static async sendOrderStatusChangeNotification(order: IOrder, oldStatus: OrderStatus, newStatus: OrderStatus) {
    try {
      // Populate order data
      const populatedOrder = await this.populateOrderData(order);

      // Send email notifications
      await this.emailService.sendStatusUpdateToAll(populatedOrder, newStatus);

      // Send push notification to admins
      const admins = await AdminSchema.find({ fcmToken: { $exists: true } });
      const tokens = admins
        .map(admin => admin.fcmToken)
        .filter((token): token is string => Boolean(token));

      if (tokens.length > 0) {
        const message = {
          notification: {
            title: 'Order Status Updated',
            body: `Order #${order.trackingNumber} status changed from ${oldStatus} to ${newStatus}`
          },
          data: {
            orderId: order._id,
            trackingNumber: order.trackingNumber,
            oldStatus,
            newStatus,
            type: 'STATUS_CHANGE'
          },
          tokens: tokens
        };

        await messaging.sendEachForMulticast(message);
      }
    } catch (error) {
      console.error('Error sending status change notification:', error);
    }
  }

  static async sendReadyForPickupNotification(order: IOrder) {
    try {
      // Populate order data
      const populatedOrder = await this.populateOrderData(order);

      // Send email notifications
      await this.emailService.sendReadyForPickupEmailToConsumer(populatedOrder);
      await this.emailService.sendReadyForPickupEmailToAdmin(populatedOrder);

      // Send push notification to admins
      const admins = await AdminSchema.find({ fcmToken: { $exists: true } });
      const tokens = admins
        .map(admin => admin.fcmToken)
        .filter((token): token is string => Boolean(token));

      if (tokens.length > 0) {
        const message = {
          notification: {
            title: 'Order Ready for Pickup',
            body: `Order #${order.trackingNumber} is ready for pickup at store`
          },
          data: {
            orderId: order._id,
            trackingNumber: order.trackingNumber,
            status: order.status,
            type: 'READY_FOR_PICKUP'
          },
          tokens: tokens
        };

        await messaging.sendEachForMulticast(message);
      }
    } catch (error) {
      console.error('Error sending ready for pickup notification:', error);
    }
  }
} 