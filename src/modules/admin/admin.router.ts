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

// User routes
router.get('/users', adminController.getAllUsers);
router.get('/users/:userId', adminController.getUserById);

// Order routes
router.get('/orders', adminController.getAllOrders);
router.get('/orders/stats', adminController.getOrderStats);
router.patch('/orders/:orderId/status', adminController.updateOrderStatus);

// Consumer Management routes
router.get('/consumers/stats', adminController.getConsumerStats);
router.get('/consumers', adminController.getAllConsumers);
router.get('/consumers/:consumerId', adminController.getConsumerDetails);
router.get('/consumers/:consumerId/orders', adminController.getConsumerOrders);
router.patch('/consumers/:consumerId/status', adminController.updateConsumerStatus);

export default router;