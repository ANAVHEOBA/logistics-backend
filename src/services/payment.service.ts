import axios from 'axios';
import { paystackConfig, getCallbackUrls } from '../config/paystack'; 
import { IOrder } from '../modules/order/order.model';
import crypto from 'crypto';

interface PaystackError {
  status: boolean;
  message: string;
}

export class PaymentService {
  private readonly headers;

  constructor() {
    this.headers = {
      Authorization: `Bearer ${paystackConfig.secretKey}`,
      'Content-Type': 'application/json'
    };
  }

  async initializePayment(order: IOrder, email: string) {
    try {
      const { successUrl, cancelUrl } = getCallbackUrls(order._id);
      
      const payload = {
        email,
        amount: order.price * 100, // Convert to kobo
        reference: `ORDER_${order._id}_${Date.now()}`,
        callback_url: successUrl,
        metadata: {
          order_id: order._id,
          cancel_url: cancelUrl
        }
      };

      console.log('Payment initialization payload:', payload);
      console.log('Headers:', this.headers);

      const response = await axios.post(
        `${paystackConfig.baseUrl}/transaction/initialize`,
        payload,
        { headers: this.headers }
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Payment initialization error:', error.response.data);
        throw new Error(error.response.data?.message || 'Payment initialization failed');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response from payment server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        throw new Error('Error setting up payment request');
      }
    }
  }

  async verifyPayment(reference: string) {
    try {
      const response = await axios.get(
        `${paystackConfig.baseUrl}/transaction/verify/${reference}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Payment verification error:', error.response.data);
        throw new Error(error.response.data?.message || 'Payment verification failed');
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response from payment server');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error('Error setting up verification request');
      }
    }
  }

  verifyWebhookSignature(signature: string, payload: string): boolean {
    const hash = crypto
      .createHmac('sha512', paystackConfig.webhookSecret)
      .update(payload)
      .digest('hex');
    return hash === signature;
  }
}