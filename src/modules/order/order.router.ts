import { Router } from 'express';
import { OrderController } from './order.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
const orderController = new OrderController();

// All routes require authentication
router.use(authMiddleware);

// Order routes
router.post('/', orderController.createOrder);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);
router.get('/track/:trackingNumber', orderController.trackOrder);
router.patch('/:id/status', orderController.updateOrderStatus); 
router.post('/:id/cancel', orderController.cancelOrder);

export default router;