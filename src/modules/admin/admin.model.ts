import { Document, Types } from 'mongoose';

export interface IAdmin {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin';
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdminDocument extends Omit<IAdmin, '_id'>, Document {
  _id: Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IAdminLoginRequest {
  email: string;
  password: string;
}

export interface IAdminResponse {
  _id: string;
  email: string;
  name: string;
  role: string;
  lastLoginAt?: Date;
} 