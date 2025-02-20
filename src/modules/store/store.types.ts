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

export interface StoreDashboardData {
  store: any;
  metrics: StoreMetrics;
  setupCompletion: number;
} 