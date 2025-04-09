import { Request } from 'express';
import { Document, Schema, Types } from 'mongoose';

// Add interface for request body
export interface IPaymentInitializeBody {
  orderId: string;
  email: string;
}

// Update AuthRequest to include _id
export interface AuthRequest extends Request {
  consumer?: {
    consumerId: string;
    email: string;
    type: 'consumer';
    _id: Types.ObjectId;  // Added _id field
  };
  body: IPaymentInitializeBody;
}

// Add PaystackVerificationResponse interface
export interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: 'success' | 'failed' | 'pending';
    reference: string;
    amount: number;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
    };
  };
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface IPayment extends Document {
  orderId: Types.ObjectId;  // Changed from Schema.Types.ObjectId
  amount: number;
  reference: string;
  status: 'pending' | 'success' | 'failed';
  paymentMethod?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}