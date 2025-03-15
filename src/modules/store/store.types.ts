import { StoreCategory, StoreStatus } from './store.model';

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