import mongoose, { Schema } from 'mongoose';
import { IUserDocument } from './user.model';

const userSchema = new Schema<IUserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function () {
      return (this as any).loginMethod !== 'google';
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: function () {
      return (this as any).loginMethod !== 'google';
    },
    unique: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: '',
  },
  verificationCodeExpiry: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  loginMethod: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  googleId: {
    type: String,
    sparse: true,
    index: true,
  },
  picture: {
    type: String,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpiry: {
    type: Date,
    select: false,
  },
}, {
  timestamps: true,
});

export const UserSchema = mongoose.model<IUserDocument>('User', userSchema);
