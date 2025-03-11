import { Router, Request, Response } from 'express';
import { OrderController } from './order.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { authenticateConsumer } from '../../middleware/consumer.middleware';
import { 
  validateConsumerOrder, 
  validateOrderStatusUpdate 
} from './order.validator';

const router = Router();
const orderController = new OrderController();

// Consumer routes (requires consumer auth)
router.post(
  '/consumer/place-order',
  authMiddleware,
  authenticateConsumer,
  validateConsumerOrder,
  (req: Request, res: Response) => orderController.placeConsumerOrder(req, res)
);

router.get(
  '/consumer/orders',
  authMiddleware,
  authenticateConsumer,
  (req: Request, res: Response) => orderController.getConsumerOrders(req, res)
);

router.get(
  '/consumer/orders/:orderId',
  authMiddleware,
  authenticateConsumer,
  (req: Request, res: Response) => orderController.getConsumerOrderById(req, res)
);

router.post(
  '/consumer/orders/:orderId/cancel',
  authMiddleware,
  authenticateConsumer,
  (req: Request, res: Response) => orderController.cancelConsumerOrder(req, res)
);

// Tracking route (no auth required)
router.get(
  '/track/:trackingNumber',
  (req: Request<{ trackingNumber: string }>, res: Response) => 
    orderController.trackOrder(req, res)
);

// Add new routes for payment handling
// Consumer payment routes
router.get(
  '/consumer/orders/:orderId/payment',
  authMiddleware,
  authenticateConsumer,
  (req: Request, res: Response) => orderController.getPaymentInstructions(req, res)
);

router.post(
  '/consumer/orders/:orderId/payment/receipt',
  authMiddleware,
  authenticateConsumer,
  (req: Request, res: Response) => orderController.uploadPaymentReceipt(req, res)
);

// All other routes require authentication
router.use(authMiddleware);

router.post('/', (req: Request, res: Response) => orderController.createOrder(req, res));
router.get('/', (req: Request, res: Response) => orderController.getUserOrders(req, res));
router.get('/:id', (req: Request<{ id: string }>, res: Response) => orderController.getOrderById(req, res));
router.patch(
  '/:id/status',
  validateOrderStatusUpdate,
  (req: Request<{ id: string }>, res: Response) => 
    orderController.updateOrderStatus(req, res)
);
router.post(
  '/:id/cancel',
  (req: Request<{ id: string }>, res: Response) => 
    orderController.cancelOrder(req, res)
);

export default router;