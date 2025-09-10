import { Document, Types } from 'mongoose';

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

  /* --- social-login additions --- */
  loginMethod?: 'local' | 'google';
  googleId?: string;
  picture?: string;
}

export interface IUserDocument extends Document, IUserBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

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
  isEmailVerified?: boolean;
  status?: 'active' | 'inactive';
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