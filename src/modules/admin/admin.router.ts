import { Router } from 'express';
import { AdminController } from './admin.controller';
import { adminMiddleware } from '../../middleware/admin.middleware';

const router = Router();
const adminController = new AdminController();

// Public admin routes
router.post('/setup', adminController.createFirstAdmin);
router.post('/login', adminController.login);

// Protected admin routes
router.use(adminMiddleware);

// Add FCM token update route
router.post('/fcm-token', adminController.updateFcmToken);

// User routes
router.get('/users', adminController.getAllUsers);
router.get('/users/:userId', adminController.getUserById);

// Order routes
router.get('/orders', adminController.getAllOrders);
router.get('/orders/stats', adminController.getOrderStats);
router.patch('/orders/:orderId/status', adminController.updateOrderStatus);
router.get('/orders/ready-for-pickup', adminController.getReadyForPickupOrders);

// Consumer Management routes
router.get('/consumers/stats', adminController.getConsumerStats);
router.get('/consumers', adminController.getAllConsumers);
router.get('/consumers/:consumerId', adminController.getConsumerDetails);
router.get('/consumers/:consumerId/orders', adminController.getConsumerOrders);
router.patch('/consumers/:consumerId/status', adminController.updateConsumerStatus);

// Add payment verification routes
router.get('/payments/pending', adminController.getPendingPayments);
router.post('/orders/:orderId/payment/verify', adminController.verifyPayment);

// Add receipt viewing endpoint
router.get('/orders/:orderId/receipts', adminController.getOrderReceipts);

// Add stores endpoint
router.get('/stores', adminController.getAllStores);
router.get('/stores/:storeId/payment-details', adminController.getStorePaymentDetails);
router.patch('/stores/:storeId/status', adminController.updateStoreStatus)

// Open and close stores
router.patch('/stores/:storeId/close', adminController.closeStore)
router.patch('/stores/:storeId/open', adminController.openStore)

// Add these new routes after router.get('/stores', adminController.getAllStores);
router.get('/stores/:storeId/metrics', adminController.getStoreMetricsById);
router.get('/stores/:storeId/revenue', adminController.getStoreRevenueById);
router.get('/stores/:storeId/performance', adminController.getStorePerformanceById);
router.get('/stores/:storeId/dashboard', adminController.getStoreDashboardById);

// Add these new routes after the existing store routes
router.patch('/stores/:storeId/order', adminController.updateStoreOrder);
router.post('/stores/bulk-order', adminController.bulkUpdateStoreOrder);

// Payment notification routes
router.get(
  '/notifications/payments',
  adminController.getPaymentNotifications
);

router.patch(
  '/notifications/:notificationId/mark-read',
  adminController.markNotificationRead
);

export default router;
