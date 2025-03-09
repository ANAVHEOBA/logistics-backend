import { model } from 'mongoose';
import zoneSchema from './zone.schema';

export interface IZone {
  name: string;
  deliveryPrice: number;
  description?: string;
  isActive: boolean;
}

const Zone = model<IZone>('Zone', zoneSchema);
export default Zone;