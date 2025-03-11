import { Document, Types } from 'mongoose';
import { IOrderItemResponse } from '../orderItem/orderItem.model';

export type PackageSize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PICKED_UP' 
  | 'IN_TRANSIT' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'FAILED_DELIVERY';

export type PaymentStatus = 'PENDING' | 'VERIFIED' | 'FAILED';
export type PaymentMethod = 'BANK_TRANSFER' | 'CASH' | 'OTHER';

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

export interface IGuestInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IOrderBase {
  userId?: string;  // Optional for guest orders
  guestInfo?: IGuestInfo;  // New field for guest orders
  pickupAddress: Types.ObjectId | IManualAddress;  // Changed from string to match actual usage
  deliveryAddress: Types.ObjectId | IManualAddress;  // Changed to match actual usage
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
  deliveryZone?: Types.ObjectId;
  zonePrice?: number;
  
  // New payment fields
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentReference: string;
  paymentReceipts: Array<{
    url: string;
    uploadedAt: Date;
  }>;
  paymentNotes?: string;
  paymentDate?: Date;
  bankAccountDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
}

export interface IOrderDocument extends Document, IOrderBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  _id: string;
  userId?: string;  // Make userId optional
  guestInfo?: IGuestInfo;  // Add guestInfo
  trackingNumber: string;
  pickupAddress: string | IManualAddress;
  deliveryAddress: IDeliveryAddress;
  packageSize: PackageSize;
  status: OrderStatus;
  isFragile: boolean;
  isExpressDelivery: boolean;
  requiresSpecialHandling: boolean;
  items: IOrderItemResponse[];
  specialInstructions?: string;
  estimatedWeight: number;
  price: number;
  estimatedDeliveryDate: Date;
  pickupDate?: Date;
  deliveryDate?: Date;
  statusNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // New payment fields
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentReference: string;
  paymentReceipts: Array<{
    url: string;
    uploadedAt: Date;
  }>;
  paymentNotes?: string;
  paymentDate?: Date;
  bankAccountDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
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

export interface ICreateGuestOrderRequest {
  guestInfo: IGuestInfo;
  pickupAddress: IManualAddress;  // Store's address
  deliveryAddress: IManualAddress;  // Guest orders always use manual address
  packageSize?: PackageSize;  // Optional with default
  isFragile?: boolean;
  isExpressDelivery?: boolean;
  requiresSpecialHandling?: boolean;
  items: IOrderItemBase[];
  specialInstructions?: string;
}

// New interface for lean order items
export interface IOrderItemLean {
  productId: Types.ObjectId;
  storeId: Types.ObjectId;
  quantity: number;
  price: number;
  name: string;
  description?: string;
  variantData?: {
    name: string;
    value: string;
    price: number;
  }[];
}

// Update IOrderLean to use the new interface
export interface IOrderLean extends Omit<IOrderDocument, keyof Document | 'items'> {
  _id: Types.ObjectId;
  userId?: string;
  pickupAddress: Types.ObjectId | IManualAddress;
  deliveryAddress: Types.ObjectId | IManualAddress;
  items: IOrderItemLean[];  // Use the new interface
  packageSize: PackageSize;
  status: OrderStatus;
  trackingNumber: string;
  isFragile: boolean;
  isExpressDelivery: boolean;
  requiresSpecialHandling: boolean;
  estimatedWeight: number;
  price: number;
  estimatedDeliveryDate: Date;
  pickupDate?: Date;
  deliveryDate?: Date;
  statusNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Update the IConsumerOrderRequest interface
export interface IConsumerOrderRequest {
  storeId: string;
  items: {
    productId: string;
    quantity: number;
    variantData?: {
      name: string;
      value: string;
    }[];
  }[];
  deliveryAddress: IDeliveryAddress;
  pickupAddress: IDeliveryAddress;
  packageSize: PackageSize;
  isFragile?: boolean;
  isExpressDelivery?: boolean;
  requiresSpecialHandling?: boolean;
  specialInstructions?: string;
  zoneId?: string;
  paymentMethod: PaymentMethod;
  paymentStatus?: PaymentStatus;
  paymentReference?: string;
  bankAccountDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
}