import { Document, Types } from 'mongoose';

// Base interface for user data
export interface IUserBase {
  email: string;
  password: string;
  name: string;
  phone: string;
  isEmailVerified: boolean;
  verificationCode: string;
  verificationCodeExpiry: Date;
  status: 'active' | 'inactive';
  passwordResetToken?: string;
  passwordResetExpiry?: Date;
}

// Interface for the Mongoose document
export interface IUserDocument extends Document, IUserBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for user data without Document methods
export interface IUser extends IUserBase {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRegistration {
  email: string;
  password: string;
  name: string;
  phone: string;
  isEmailVerified?: boolean;   // <-- NEW
  status?: 'active' | 'inactive'; // <-- NEW
}

export interface IVerifyEmail {
  userId: string;
  otp: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    name: string;
    isEmailVerified: boolean;
  };
}