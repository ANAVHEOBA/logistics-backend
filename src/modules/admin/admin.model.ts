import { Document, Types } from 'mongoose';
import { OrderStatus } from '../order/order.model';

export interface IAdmin {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin';
  lastLoginAt?: Date;
  fcmToken?: string; // Add FCM token for notifications
  assignedOrders: string[]; // Array of order IDs
  activeOrderCount: number;
  orderHistory: {
    orderId: string;
    action: string;
    status: OrderStatus;
    timestamp: Date;
    notes?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdminDocument extends Omit<IAdmin, '_id'>, Document {
  _id: Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IAdminLoginRequest {
  email: string;
  password: string;
}

export interface IAdminResponse {
  _id: string;
  email: string;
  name: string;
  role: string;
  lastLoginAt?: Date;
  activeOrderCount: number;
}

export interface IOrderStatusUpdate {
  orderId: string;
  adminId: string;
  status: OrderStatus;
  notes?: string;
}

export interface IConsumerStatusUpdate {
  consumerId: string;
  status: 'active' | 'inactive';
  reason?: string;
  adminId: string;
} 