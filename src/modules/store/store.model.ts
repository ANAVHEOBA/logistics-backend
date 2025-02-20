import mongoose, { Schema, Document } from 'mongoose';

export interface IStore extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
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
  branding: {
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
  settings: {
    isVerified: boolean;
    isFeaturedStore: boolean;
    allowRatings: boolean;
  };
  metrics: {
    totalOrders: number;
    totalProducts: number;
    totalRevenue: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export enum StoreCategory {
  FASHION = 'FASHION',
  ELECTRONICS = 'ELECTRONICS',
  FOOD = 'FOOD',
  HEALTH_BEAUTY = 'HEALTH_BEAUTY',
  HOME_GARDEN = 'HOME_GARDEN',
  SPORTS = 'SPORTS',
  OTHER = 'OTHER'
}

export enum StoreStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED'
}

const storeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  storeName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: String,
    enum: Object.values(StoreCategory),
    required: true
  },
  status: {
    type: String,
    enum: Object.values(StoreStatus),
    default: StoreStatus.PENDING
  },
  contactInfo: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    whatsapp: String
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    }
  },
  branding: {
    logo: String,
    banner: String,
    colors: {
      primary: String,
      secondary: String
    }
  },
  socialLinks: {
    instagram: String,
    facebook: String,
    twitter: String
  },
  businessInfo: {
    registrationNumber: String,
    taxId: String
  },
  settings: {
    isVerified: {
      type: Boolean,
      default: false
    },
    isFeaturedStore: {
      type: Boolean,
      default: false
    },
    allowRatings: {
      type: Boolean,
      default: true
    }
  },
  metrics: {
    totalOrders: {
      type: Number,
      default: 0
    },
    totalProducts: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Add indexes
storeSchema.index({ storeName: 1 });
storeSchema.index({ userId: 1 });
storeSchema.index({ category: 1 });
storeSchema.index({ status: 1 });

export const Store = mongoose.model<IStore>('Store', storeSchema); 