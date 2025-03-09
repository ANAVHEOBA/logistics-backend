import { Request, Response } from 'express';
import { PaymentService } from '../../services/payment.service';
import { PaymentCrud } from './payment.crud';
import { OrderCrud } from '../order/order.crud';
import { Types } from 'mongoose';
import { AuthRequest, PaystackResponse, PaystackVerificationResponse } from './payment.model';
import { OrderStatus } from '../order/order.model';

export class PaymentController {
  private paymentService: PaymentService;
  private paymentCrud: PaymentCrud;
  private orderCrud: OrderCrud;

  constructor() {
    this.paymentService = new PaymentService();
    this.paymentCrud = new PaymentCrud();
    this.orderCrud = new OrderCrud();
  }

  initializePayment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { orderId, email } = req.body;
      const consumerId = req.consumer?.consumerId;
      
      if (!consumerId) {
        res.status(401).json({ success: false, message: 'Consumer not authenticated' });
        return;
      }

      const order = await this.orderCrud.findById(orderId, consumerId);

      if (!order) {
        res.status(404).json({ success: false, message: 'Order not found' });
        return;
      }

      const paymentData = await this.paymentService.initializePayment(order, email) as PaystackResponse;
      
      await this.paymentCrud.createPayment({
        orderId: new Types.ObjectId(order._id),
        amount: order.price,
        reference: paymentData.data.reference,
        status: 'pending'
      });

      res.status(200).json({ success: true, data: paymentData.data });
    } catch (error) {
      console.error('Payment initialization error:', error);
      res.status(500).json({ success: false, message: 'Payment initialization failed' });
    }
  };

  verifyPayment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { reference } = req.params;
      const response = await this.paymentService.verifyPayment(reference);
      const verificationData = response as PaystackVerificationResponse;
      
      if (verificationData.data.status === 'success') {
        const payment = await this.paymentCrud.updatePaymentStatus(reference, 'success');
        if (payment) {
          await this.orderCrud.adminUpdateOrderStatus(
            payment.orderId.toString(),
            'CONFIRMED' as OrderStatus
          );
        }
      }

      res.status(200).json({ success: true, data: verificationData.data });
    } catch (error: any) {
      console.error('Payment verification error:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || 'Payment verification failed' 
      });
    }
  };

  handlePaymentSuccess = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderId } = req.params;
      const payment = await this.paymentCrud.getPaymentByOrderId(orderId);
      
      if (payment) {
        await this.orderCrud.adminUpdateOrderStatus(
          orderId,
          'CONFIRMED' as OrderStatus
        );
      }

      // Redirect to frontend success page
      res.redirect(`${process.env.FRONTEND_URL}/payment/success?orderId=${orderId}`);
    } catch (error: any) {
      console.error('Payment success handling error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
    }
  };

  handlePaymentCancel = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderId } = req.params;
      // Redirect to frontend cancel page
      res.redirect(`${process.env.FRONTEND_URL}/payment/cancel?orderId=${orderId}`);
    } catch (error: any) {
      console.error('Payment cancel handling error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
    }
  };

  handleWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
      const signature = req.headers['x-paystack-signature'] as string;
      
      if (!this.paymentService.verifyWebhookSignature(signature, JSON.stringify(req.body))) {
        res.status(400).json({ success: false, message: 'Invalid signature' });
        return;
      }

      const event = req.body;
      const reference = event.data.reference;

      if (event.event === 'charge.success') {
        const payment = await this.paymentCrud.updatePaymentStatus(reference, 'success');
        if (payment) {
          await this.orderCrud.adminUpdateOrderStatus(
            payment.orderId.toString(),
            'CONFIRMED' as OrderStatus
          );
        }
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ success: false, message: 'Webhook processing failed' });
    }
  };
}