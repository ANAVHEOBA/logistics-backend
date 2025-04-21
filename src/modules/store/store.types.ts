import { StoreCategory, StoreStatus } from './store.model';
import { Types } from 'mongoose';

export interface CreateStoreDTO {
  storeName: string;
  description: string;
  category: StoreCategory;
  contactInfo: {
    email: string;
    phone: string;
    whatsapp?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  branding?: {
    logo?: string;
    banner?: string;
    colors?: {
      primary: string;
      secondary: string;
    };
  };
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  businessInfo?: {
    registrationNumber?: string;
    taxId?: string;
  };
}

export interface StoreMetrics {
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
}

export interface StoreOrderStats {
  total: number;
  pending: number;
  completed: number;
  cancelled: number;
  revenue: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
}

export interface ProductPerformance {
  productId: string;
  name: string;
  totalOrders: number;
  totalQuantity: number;
  totalRevenue: number;
  averageRating?: number;
}

export interface StoreDashboardData {
  store: any;
  metrics: StoreMetrics;
  setupCompletion: number;
  stats: StoreOrderStats;
  recentOrders: any[];
  topProducts: ProductPerformance[];
  revenueBreakdown: {
    daily: { date: string; amount: number }[];
    monthly: { month: string; amount: number }[];
  };
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  status?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface StoreOrder {
  _id: string;
  orderId: string;
  trackingNumber: string;
  status: string;
  paymentStatus: string;
  createdAt: Date;
  items: any[];
  pickupAddress: any;
  deliveryAddress: any;
  specialInstructions?: string;
}

export interface StoreCustomer {
  consumerId: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
}

export interface StoreCustomersResponse {
  customers: StoreCustomer[];
  total: number;
  page: number;
  totalPages: number;
}

export interface RevenueOptions {
  startDate?: Date;
  endDate?: Date;
}

export interface PaymentDetails {
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
}

export interface IStore {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  storeName: string;
  description: string;
  category: StoreCategory;
  status: StoreStatus;
  contactInfo: {
    email: string;
    phone: string;
    whatsapp?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  branding?: {
    logo?: string;
    banner?: string;
    colors?: {
      primary: string;
      secondary: string;
    };
  };
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  businessInfo?: {
    registrationNumber?: string;
    taxId?: string;
  };
  paymentDetails?: PaymentDetails;
  metrics: {
    totalOrders: number;
    totalProducts: number;
    totalRevenue: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreListOptions {
  filter?: any;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface StoreListResponse {
  stores: IStore[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    hasMore: boolean;
  };
} 