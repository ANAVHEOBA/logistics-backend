import { messaging } from '../config/firebase/firebase';
import { IOrder } from '../modules/order/order.model';
import { AdminSchema } from '../modules/admin/admin.schema';

export class NotificationService {
  static async sendNewOrderNotification(order: IOrder) {
    try {
      // Get all admin FCM tokens
      const admins = await AdminSchema.find({ fcmToken: { $exists: true } });
      // Filter out any undefined or null tokens and ensure they are strings
      const tokens = admins
        .map(admin => admin.fcmToken)
        .filter((token): token is string => Boolean(token));

      if (tokens.length === 0) return;

      // Prepare notification message
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

      // Send notification using sendEachForMulticast
      const response = await messaging.sendEachForMulticast(message);
      console.log('Notification sent:', response);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
} 