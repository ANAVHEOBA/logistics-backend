import { model, Document, Types } from 'mongoose';
import zoneSchema from './zone.schema';

export interface IZone extends Document {
  _id: Types.ObjectId;
  name: string;
  deliveryPrice: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const Zone = model<IZone>('Zone', zoneSchema);
export default Zone;