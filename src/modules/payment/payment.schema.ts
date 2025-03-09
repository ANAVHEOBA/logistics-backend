import mongoose, { Schema, Types } from 'mongoose';
import { IPayment } from './payment.model';

const paymentSchema = new Schema({
  orderId: {
    type: Types.ObjectId, 
    ref: 'Order',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  reference: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  paymentMethod: String,
  metadata: Schema.Types.Mixed
}, {
  timestamps: true
});

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);