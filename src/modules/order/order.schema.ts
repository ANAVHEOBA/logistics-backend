import mongoose, { Schema, Document } from 'mongoose';
import { IOrderDocument, IOrderItemBase, PackageSize, OrderStatus } from './order.model';
import { generateTrackingNumber } from '../../utils/tracking.helper';
import { calculatePrice } from '../../utils/price.helper';
import { io } from '../../app';

const orderItemSchema = new Schema({
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
  }]
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
    required: function(this: IOrderDocument) {
      return !this.guestInfo;
    }
  },
  guestInfo: {
    email: {
      type: String,
      required: function(this: IOrderDocument) {
        return !this.userId;
      }
    },
    firstName: String,
    lastName: String,
    phone: String
  },
  pickupAddress: {
    type: Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(v: any) {
        return (
          mongoose.Types.ObjectId.isValid(v) || 
          (v && typeof v === 'object' && v.street && v.city && v.state)
        );
      },
      message: 'Invalid pickup address'
    }
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
    enum: [
      'PENDING',
      'CONFIRMED',
      'READY_FOR_PICKUP',
      'PICKED_UP',
      'IN_TRANSIT',
      'DELIVERED',
      'CANCELLED',
      'FAILED_DELIVERY'
    ],
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
  },
  deliveryZone: {
    type: Schema.Types.ObjectId,
    ref: 'Zone'
  },
  zonePrice: {
    type: Number
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

// Remove the pre-validate middleware that's causing the issue
orderSchema.pre('validate', async function(this: IOrderDocument, next) {
  if (this.isNew) {
    if (!this.trackingNumber) {
      this.trackingNumber = generateTrackingNumber();
    }
    this.estimatedWeight = calculateEstimatedWeight(this.packageSize as PackageSize);
    this.estimatedDeliveryDate = calculateEstimatedDeliveryDate(this.isExpressDelivery);
  }
  next();
});

function toOrderResponse(order: IOrderDocument): any {
  const orderObject = order.toObject();

  // Calculate total product price
  const productTotal = orderObject.items.reduce((sum: number, item: any) => {
    return sum + item.price * item.quantity;
  }, 0);

  const deliveryFee = orderObject.zonePrice || 0;

  // Handle consumer information
  let consumerInfo = null;
  if (orderObject.userId) {
    if (typeof orderObject.userId === "object") {
      consumerInfo = {
        name: `${orderObject.userId.firstName} ${orderObject.userId.lastName}`,
        email: orderObject.userId.email,
        phone: orderObject.userId.phone,
        isGuest: false,
      };
    }
  } else if (orderObject.guestInfo) {
    consumerInfo = {
      name: `${orderObject.guestInfo.firstName} ${orderObject.guestInfo.lastName}`,
      email: orderObject.guestInfo.email,
      phone: orderObject.guestInfo.phone,
      isGuest: true,
    };
  }

  return {
    ...orderObject,
    _id: orderObject._id.toString(),
    consumer: consumerInfo,
    pickupAddress: orderObject.pickupAddress
      ? typeof orderObject.pickupAddress === "object"
        ? orderObject.pickupAddress // Keep manual address as is for guest orders
        : orderObject.pickupAddress.toString() // Convert ObjectId to string for user orders
      : undefined,
    deliveryAddress: orderObject.deliveryAddress
      ? typeof orderObject.deliveryAddress === "object"
        ? orderObject.deliveryAddress // Keep manual address as is
        : orderObject.deliveryAddress.toString() // Convert ObjectId to string
      : undefined,
    items: orderObject.items.map(
      (item: IOrderItemBase & { productId: any; storeId: any }) => ({
        ...item,
        productId:
          typeof item.productId === "object"
            ? item.productId.toString()
            : item.productId,
        storeId:
          typeof item.storeId === "object"
            ? {
                _id: item.storeId._id.toString(),
                storeName: item.storeId.storeName,
              }
            : item.storeId,
      }),
    ),
    priceBreakdown: {
      productTotal,
      deliveryFee,
      total: orderObject.price,
    },
  };
}



orderSchema.post(
  "save",
  async function (doc: IOrderDocument): Promise<void> {
    // Notify the admin
    io.to("admin").emit("new-order", {
      message: "A new order was placed",
      order: toOrderResponse(doc),
    });

    // Notify story owners
    doc.items.map((item) => {
      io.to(`store-${item.storeId}`).emit("new-store-order", {
        message: "A new order for your store",
        order: item,
      });
    });
  },
);

export const OrderSchema = mongoose.model<IOrderDocument>('Order', orderSchema);
