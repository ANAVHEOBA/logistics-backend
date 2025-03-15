import mongoose, { Schema, Document, ToObjectOptions } from 'mongoose';

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
  slug: string;
  getStoreUrl(): string;
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

// Move the generateUniqueSlug function before the schema definition
async function generateUniqueSlug(storeName: string): Promise<string> {
  const baseSlug = storeName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  let slug = baseSlug;
  let counter = 1;
  
  // Check if Store model is available
  if (mongoose.models.Store) {
    while (await mongoose.models.Store.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }
  
  return slug;
}

// Define the method type for TypeScript
interface IStoreMethods {
  getStoreUrl(): string;
}

const storeSchema = new Schema<IStore, mongoose.Model<IStore>, IStoreMethods>({
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
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  }
}, {
  timestamps: true
});

// Update the pre-save middleware with proper error typing
storeSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('storeName')) {
    try {
      this.slug = await generateUniqueSlug(this.storeName);
      next();
    } catch (error) {
      next(error as Error);
    }
  } else {
    next();
  }
});

// Add indexes
storeSchema.index({ category: 1 });
storeSchema.index({ status: 1 });

// Add the method implementation
storeSchema.methods.getStoreUrl = function(): string {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:5000/store/${this.slug}`;
  }
  return `https://yourapp.com/store/${this.slug}`;
};

// Add virtual field for storeUrl
storeSchema.virtual('storeUrl').get(function(this: IStore) {
  return this.getStoreUrl();
});

// Make sure virtuals are included in JSON
storeSchema.set('toJSON', {
  virtuals: true,
  transform: function(
    _doc: Document<unknown, {}, unknown> & { _id: mongoose.Types.ObjectId } & { __v: number },
    ret: Record<string, any>,
    _options: ToObjectOptions<typeof _doc>
  ) {
    delete ret.id;  // Remove duplicate id field
    return ret;
  }
});

// Export the model with proper typing
export const Store = mongoose.model<IStore, mongoose.Model<IStore, {}, IStoreMethods>>('Store', storeSchema); 