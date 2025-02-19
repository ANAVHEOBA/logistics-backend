import mongoose, { Schema, Document } from 'mongoose';
import { IOrderDocument, PackageSize, OrderStatus } from './order.model';
import { generateTrackingNumber } from '../../utils/tracking.helper';
import { calculatePrice } from '../../utils/price.helper';

const orderItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String,
    trim: true
  }
});

const manualAddressSchema = new Schema({
  street: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: String,
    required: true,
    trim: true
  },
  recipientName: {
    type: String,
    required: true,
    trim: true
  },
  recipientPhone: {
    type: String,
    required: true,
    trim: true
  }
});

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pickupAddress: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  deliveryAddress: {
    type: Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(v: any) {
        return (
          mongoose.Types.ObjectId.isValid(v) || 
          (v && 
           typeof v === 'object' &&
           v.street &&
           v.city &&
           v.state &&
           v.country &&
           v.postalCode &&
           v.recipientName &&
           v.recipientPhone)
        );
      },
      message: 'Delivery address must be either a valid address ID or a complete manual address'
    }
  },
  packageSize: {
    type: String,
    enum: ['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE'],
    required: true
  },
  estimatedWeight: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED', 'FAILED_DELIVERY'],
    default: 'PENDING'
  },
  trackingNumber: {
    type: String,
    unique: true
  },
  price: {
    type: Number,
  },
  isFragile: {
    type: Boolean,
    default: false
  },
  isExpressDelivery: {
    type: Boolean,
    default: false
  },
  requiresSpecialHandling: {
    type: Boolean,
    default: false
  },
  pickupDate: Date,
  deliveryDate: Date,
  estimatedDeliveryDate: Date,
  items: [orderItemSchema],
  specialInstructions: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Helper functions
function calculateEstimatedWeight(packageSize: PackageSize): number {
  const weightRanges: Record<PackageSize, number> = {
    SMALL: 5,
    MEDIUM: 20,
    LARGE: 50,
    EXTRA_LARGE: 100
  };
  return weightRanges[packageSize];
}

function calculateEstimatedDeliveryDate(isExpressDelivery: boolean): Date {
  const date = new Date();
  date.setDate(date.getDate() + (isExpressDelivery ? 1 : 3));
  return date;
}

// Pre-validate middleware to set calculated fields
orderSchema.pre('validate', async function(next) {
  if (this.isNew) {
    const doc = this as unknown as IOrderDocument;
    doc.trackingNumber = generateTrackingNumber();
    doc.estimatedWeight = calculateEstimatedWeight(doc.packageSize as PackageSize);
    doc.price = await calculatePrice(doc);
    doc.estimatedDeliveryDate = calculateEstimatedDeliveryDate(doc.isExpressDelivery);
  }
  next();
});

export const OrderSchema = mongoose.model<IOrderDocument>('Order', orderSchema);