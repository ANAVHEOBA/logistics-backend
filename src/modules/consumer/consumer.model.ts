import { Document, Types } from 'mongoose';

interface ConsumerPreferences {
  favoriteStores: Types.ObjectId[];
  preferredCategories: string[];
}

export interface IConsumerBase {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  isEmailVerified: boolean;
  verificationCode: string;
  verificationCodeExpiry: Date;
  status: 'active' | 'inactive';
  preferences: ConsumerPreferences;
  lastLoginAt?: Date;
  passwordResetToken?: string;
  passwordResetExpiry?: Date;
}

export interface IConsumerRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IConsumerDocument extends Document, IConsumerBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}