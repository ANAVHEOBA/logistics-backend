import { Router } from 'express';
import { OrderItemController } from './orderItem.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateOrderItemStatus } from './orderItem.validator';

const router = Router();
const orderItemController = new OrderItemController();

// Store owner routes (protected)
router.get(
  '/store',
  authMiddleware,
  orderItemController.getStoreOrderItems
);

router.get(
  '/store/stats',
  authMiddleware,
  orderItemController.getStoreStats
);

router.put(
  '/:itemId/status',
  authMiddleware,
  validateOrderItemStatus,
  orderItemController.updateItemStatus
);

router.post(
  '/:itemId/refund',
  authMiddleware,
  orderItemController.initiateRefund
);

// Order item routes
router.get(
  '/order/:orderId',
  orderItemController.getOrderItems
);

export default router; 