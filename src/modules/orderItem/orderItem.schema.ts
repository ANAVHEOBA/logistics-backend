import mongoose, { Schema } from 'mongoose';
import { IOrderItem, OrderItemStatus, RefundStatus } from './orderItem.model';

const orderItemSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  variantData: [{
    name: String,
    value: String,
    price: Number
  }],
  status: {
    type: String,
    enum: Object.values(OrderItemStatus),
    default: OrderItemStatus.PENDING
  },
  refundStatus: {
    type: String,
    enum: Object.values(RefundStatus)
  },
  refundReason: String
}, {
  timestamps: true
});

// Indexes
orderItemSchema.index({ orderId: 1 });
orderItemSchema.index({ productId: 1 });
orderItemSchema.index({ storeId: 1 });
orderItemSchema.index({ status: 1 });

export const OrderItem = mongoose.model<IOrderItem>('OrderItem', orderItemSchema); 