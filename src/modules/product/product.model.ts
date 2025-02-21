import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  storeId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  specifications?: {
    [key: string]: string;
  };
  variants?: Array<{
    name: string;
    options: string[];
    prices?: number[];
  }>;
  status: ProductStatus;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  guestOrderEnabled: boolean;
  minOrderQuantity: number;
  maxOrderQuantity: number;
  shippingInfo?: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    requiresSpecialHandling: boolean;
  };
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED'
}

const productSchema = new Schema({
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  specifications: {
    type: Map,
    of: String
  },
  variants: [{
    name: String,
    options: [String],
    prices: [Number]
  }],
  status: {
    type: String,
    enum: Object.values(ProductStatus),
    default: ProductStatus.ACTIVE
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  guestOrderEnabled: {
    type: Boolean,
    default: true
  },
  minOrderQuantity: {
    type: Number,
    default: 1,
    min: 1
  },
  maxOrderQuantity: {
    type: Number,
    default: 999,
    min: 1
  },
  shippingInfo: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    requiresSpecialHandling: Boolean
  }
}, {
  timestamps: true
});

// Indexes
productSchema.index({ storeId: 1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema); 