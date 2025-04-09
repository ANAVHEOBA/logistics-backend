import mongoose, { Schema } from 'mongoose';
import { IConsumerDocument } from './consumer.model';

const consumerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  verificationCodeExpiry: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  preferences: {
    favoriteStores: [{
      type: Schema.Types.ObjectId,
      ref: 'Store'
    }],
    preferredCategories: [String]
  },
  lastLoginAt: Date,
  passwordResetToken: String,
  passwordResetExpiry: Date
}, {
  timestamps: true
});

export const ConsumerSchema = mongoose.model<IConsumerDocument>('Consumer', consumerSchema);