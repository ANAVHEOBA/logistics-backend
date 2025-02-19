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
router.get('/users', adminController.getAllUsers);
router.get('/users/:userId', adminController.getUserById);
router.get('/orders', adminController.getAllOrders);
router.patch('/orders/:orderId/status', adminController.updateOrderStatus);
router.get('/orders/stats', adminController.getOrderStats);

export default router;