import mongoose, { Schema } from 'mongoose';
import { IAdminDocument } from './admin.model';
import bcrypt from 'bcryptjs';

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin']
  },
  lastLoginAt: {
    type: Date
  },
  assignedOrders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  activeOrderCount: {
    type: Number,
    default: 0
  },
  orderHistory: [{
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    action: String,
    status: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  notifications: [{
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    type: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'UNREAD'
    },
    details: {
      orderNumber: String,
      amount: Number,
      paymentReference: String,
      consumerName: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const AdminSchema = mongoose.model<IAdminDocument>('Admin', adminSchema); 