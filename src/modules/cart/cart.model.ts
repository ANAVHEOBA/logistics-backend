import mongoose, { Document, Types } from 'mongoose';
import { Schema } from 'mongoose';

export interface ICartItem {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  storeId: Types.ObjectId;
  quantity: number;
  price: number;
  name: string;
  variantData?: {
    name: string;
    value: string;
    price: number;
  }[];
  addedAt: Date;
}

export interface ICartBase {
  userId?: Types.ObjectId; // Optional for guest carts
  items: ICartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date; // For guest carts
}

export interface ICartDocument extends Document, ICartBase {
  _id: Types.ObjectId;
}

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  storeName: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  variantData: [{
    name: String,
    value: String,
    price: Number
  }],
  addedAt: {
    type: Date,
    default: Date.now
  }
});


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: false
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: false
  }
});

// Update total price before saving
cartSchema.pre('save', async function(next) {
  this.totalPrice = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  this.updatedAt = new Date();

  for (const item of this.items) {
    if (!item.storeName && item.storeId) {
      const store = await mongoose.model('Store').findById(item.storeId);
      if (store) {
        item.storeName = store.storeName;
      }
    }
  }
  next();
});

export const Cart = mongoose.model<ICartDocument>('Cart', cartSchema); 
