import { Document, Types } from 'mongoose';

// Base interface for shared properties
export interface IOrderItemBase {
  orderId: Types.ObjectId | string;
  productId: Types.ObjectId | string;
  storeId: Types.ObjectId | string;
  quantity: number;
  price: number;
  name: string;
  description?: string;
  variantData?: {
    name: string;
    value: string;
    price: number;
  }[];
  status: OrderItemStatus;
  refundStatus?: RefundStatus;
  refundReason?: string;
}

// Mongoose Document interface
export interface IOrderItem extends Document, IOrderItemBase {
  _id: Types.ObjectId;
}

// Plain object interface (for API responses)
export interface IOrderItemResponse extends Omit<IOrderItemBase, 'orderId' | 'productId' | 'storeId'> {
  _id: string;
  orderId: string;
  productId: string;
  storeId: string;
}

export enum OrderItemStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export enum RefundStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
} 