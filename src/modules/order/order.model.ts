import { Document, Types } from 'mongoose';
import { IOrderItem as IOrderItemDocument } from '../orderItem/orderItem.model';

export type PackageSize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PICKED_UP' 
  | 'IN_TRANSIT' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'FAILED_DELIVERY';

export interface IOrderItemBase {
  name: string;
  quantity: number;
  description?: string;
  productId: string;
  storeId: string;
  price: number;
  variantData?: {
    name: string;
    value: string;
    price: number;
  }[];
}

export interface IManualAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  recipientName: string;
  recipientPhone: string;
}

export interface IDeliveryAddress {
  type: 'saved' | 'manual';
  savedAddress?: string; // Address ID if using saved address
  manualAddress?: IManualAddress; // Manual address details if not using saved
}

export interface IOrderBase {
  userId: string;
  pickupAddress: string;
  deliveryAddress: string | IManualAddress; // Can be either address ID or manual address
  packageSize: PackageSize;
  estimatedWeight: number;
  status: OrderStatus;
  trackingNumber: string;
  price: number;
  
  isFragile: boolean;
  isExpressDelivery: boolean;
  requiresSpecialHandling: boolean;
  
  pickupDate?: Date;
  deliveryDate?: Date;
  estimatedDeliveryDate: Date;
  
  items: IOrderItemBase[];
  specialInstructions?: string;
}

export interface IOrderDocument extends Document, IOrderBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  _id: string;
  userId: string;
  trackingNumber: string;
  pickupAddress: string | IManualAddress;
  deliveryAddress: IDeliveryAddress;
  packageSize: PackageSize;
  status: OrderStatus;
  isFragile: boolean;
  isExpressDelivery: boolean;
  requiresSpecialHandling: boolean;
  items: IOrderItemDocument[];
  specialInstructions?: string;
  estimatedWeight: number;
  price: number;
  estimatedDeliveryDate: Date;
  pickupDate?: Date;
  deliveryDate?: Date;
  statusNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateOrderRequest {
  pickupAddress: string; // User's address ID
  deliveryAddress: IDeliveryAddress;
  packageSize: PackageSize;
  isFragile: boolean;
  isExpressDelivery: boolean;
  requiresSpecialHandling: boolean;
  items: IOrderItemBase[];
  specialInstructions?: string;
}

export interface IUpdateOrderRequest extends Partial<ICreateOrderRequest> {
  status?: OrderStatus;
}