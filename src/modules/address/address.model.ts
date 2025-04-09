import { Document, Types } from 'mongoose';

export interface IAddressBase {
  userId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  label?: string; 
}

export interface IAddressDocument extends Document, IAddressBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress extends IAddressBase {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAddressRequest {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  label?: string;
  isDefault?: boolean;
}

export interface IUpdateAddressRequest extends Partial<ICreateAddressRequest> {}