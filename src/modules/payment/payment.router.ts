import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { authenticateConsumer } from '../../middleware/consumer.middleware';

const router = Router();
const paymentController = new PaymentController();

// Initialize payment route (requires consumer auth)
router.post(
  '/initialize',
  authenticateConsumer,
  paymentController.initializePayment
);

// Verify payment route (requires consumer auth)
router.get(
  '/verify/:reference',
  authenticateConsumer,
  paymentController.verifyPayment
);

// Success callback route
router.get(
  '/success/:orderId',
  authenticateConsumer,
  paymentController.handlePaymentSuccess
);

// Cancel callback route
router.get(
  '/cancel/:orderId',
  authenticateConsumer,
  paymentController.handlePaymentCancel
);

// Webhook route (no auth required - secured by signature)
router.post('/webhook', paymentController.handleWebhook);

export default router;
