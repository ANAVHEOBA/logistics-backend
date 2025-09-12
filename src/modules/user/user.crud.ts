import { UserSchema } from './user.schema';
import { OrderSchema } from '../order/order.schema';
import { IUser, IUserDocument, IUserRegistration } from './user.model';
import { 
  IOrder, 
  IDeliveryAddress, 
  IManualAddress, 
  IOrderBase,
  IOrderDocument,
  OrderStatus,
  PackageSize,
  IOrderItemBase,
  IOrderLean
} from '../order/order.model';
import { 
  IOrderItem,
  OrderItemStatus,
  IOrderItemResponse
} from '../orderItem/orderItem.model';
import mongoose, { FlattenMaps, Types } from 'mongoose';

export class UserCrud {
  async createUser(userData: IUserRegistration & { 
    verificationCode: string, 
    verificationCodeExpiry: Date 
  }): Promise<IUser> {
    try {
      const user = await UserSchema.create(userData);
      return this.toUserResponse(user);
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await UserSchema.findOne({ email }).exec();
      return user ? this.toUserResponse(user) : null;
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(userId: string): Promise<IUser | null> {
    try {
      const user = await UserSchema.findByIdAndUpdate(
        userId,
        {
          isEmailVerified: true,
          status: 'active',
          verificationCode: '',
        },
        { new: true }
      ).exec();
      return user ? this.toUserResponse(user) : null;
    } catch (error) {
      throw error;
    }
  }


  async findByPhone(phone: string): Promise<IUser | null> {
    try {
      const user = await UserSchema.findOne({ phone }).exec();
      return user ? this.toUserResponse(user) : null;
    } catch (error) {
      throw error;
    }
  }

  async verifyPhone(userId: string): Promise<IUser | null> {
    try {
      const user = await UserSchema.findByIdAndUpdate(
        userId,
        {
          isPhoneVerified: true,
          status: 'active',
          verificationCode: '',
        },
        { new: true }
      ).exec();
      return user ? this.toUserResponse(user) : null;
    } catch (error) {
      throw error;
    }
  }

  async findAll(page: number, limit: number): Promise<IUserDocument[]> {
    try {
      const skip = (page - 1) * limit;
      return await UserSchema.find()
        .skip(skip)
        .limit(limit)
        .select('-password') // Exclude password from results
        .sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  async countAll(): Promise<number> {
    try {
      return await UserSchema.countDocuments();
    } catch (error) {
      throw error;
    }
  }

  async getUserOrders(userId: string): Promise<IOrder[]> {
    try {
      const orders = await OrderSchema.find({ 
        userId: new mongoose.Types.ObjectId(userId) 
      })
        .populate('pickupAddress')
        .populate('deliveryAddress')
        .sort({ createdAt: -1 })
        .lean<IOrderLean[]>();

      return orders.map(order => {
        const deliveryAddress = order.deliveryAddress as FlattenMaps<IManualAddress> | Types.ObjectId;
        
        let formattedDeliveryAddress: IDeliveryAddress;
        if ('_id' in deliveryAddress) {  // Type guard for ObjectId
          formattedDeliveryAddress = {
            type: 'saved',
            savedAddress: deliveryAddress._id.toString()
          };
        } else {
          formattedDeliveryAddress = {
            type: 'manual',
            manualAddress: deliveryAddress as FlattenMaps<IManualAddress>
          };
        }

        const formattedItems: IOrderItemResponse[] = (order.items || []).map(item => ({
          _id: new mongoose.Types.ObjectId().toString(),
          orderId: order._id.toString(),
          productId: item.productId.toString(),
          storeId: item.storeId.toString(),
          name: item.name || '',
          quantity: item.quantity || 0,
          description: item.description || '',
          price: item.price || 0,
          variantData: item.variantData?.map(variant => ({
            name: variant.name || '',
            value: variant.value || '',
            price: variant.price || 0
          })) || [],
          status: OrderItemStatus.PENDING
        }));

        const pickupAddress = order.pickupAddress as Types.ObjectId | IManualAddress;
        const pickupAddressStr = '_id' in pickupAddress 
          ? pickupAddress._id.toString() 
          : '';

        return {
          _id: order._id.toString(),
          userId: order.userId?.toString() || userId,
          items: formattedItems,
          pickupAddress: pickupAddressStr,
          deliveryAddress: formattedDeliveryAddress,
          packageSize: order.packageSize,
          status: order.status || 'PENDING',
          isFragile: Boolean(order.isFragile),
          isExpressDelivery: Boolean(order.isExpressDelivery),
          requiresSpecialHandling: Boolean(order.requiresSpecialHandling),
          estimatedDeliveryDate: order.estimatedDeliveryDate,
          specialInstructions: order.specialInstructions || '',
          trackingNumber: order.trackingNumber || '',
          estimatedWeight: order.estimatedWeight || 0,
          price: order.price || 0,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          deliveryDate: order.deliveryDate,
          statusNotes: order.statusNotes || '',
          paymentStatus: order.paymentStatus || 'PENDING',
          paymentMethod: order.paymentMethod || 'BANK_TRANSFER',
          paymentReference: order.paymentReference || '',
          paymentReceipts: order.paymentReceipts || []
        };
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(userId: string): Promise<IUserDocument | null> {
    try {
      return await UserSchema.findById(userId).select('-password');
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    try {
      const user = await UserSchema.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      ).select('-password');
      return user ? this.toUserResponse(user) : null;
    } catch (error) {
      throw error;
    }
  }

  private toUserResponse(user: IUserDocument): IUser {
    const userObject = user.toObject();
    return {
      ...userObject,
      _id: userObject._id.toString(),
    } as IUser;
  }

  async setPasswordResetToken(
    email: string,
    token: string,
    expiry: Date
  ): Promise<IUser | null> {
    try {
      const user = await UserSchema.findOneAndUpdate(
        { email },
        {
          $set: {
            passwordResetToken: token,
            passwordResetExpiry: expiry
          }
        },
        { new: true }
      ).select('+passwordResetToken +passwordResetExpiry');
      
      return user ? this.toUserResponse(user) : null;
    } catch (error) {
      console.error('Error setting password reset token:', error);
      throw error;
    }
  }

  async updatePassword(
    userId: string,
    hashedPassword: string
  ): Promise<IUser | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return null;
      }

      const user = await UserSchema.findByIdAndUpdate(
        userId,
        {
          $set: {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetExpiry: null
          }
        },
        { new: true }
      ).select('+passwordResetToken +passwordResetExpiry');

      return user ? this.toUserResponse(user) : null;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }

  async deleteUser(userId: string) {
    try {
      await UserSchema.findByIdAndDelete(userId)
    } catch(error) {
      console.error("Error deleting user", error)
      throw error
    }
  }

  public toUser(userDoc: IUserDocument): IUser {
    return {
      ...userDoc.toObject(),
      _id: userDoc._id.toString()
    };
  }
}
