import { Document, Types } from 'mongoose';

export interface IRating {
  storeId: Types.ObjectId;
  consumerId: Types.ObjectId;
  rating: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRatingDocument extends Document, IRating {} 