import { UserSchema } from './user.schema';
import { OrderSchema } from '../order/order.schema';
import { IUser, IUserDocument, IUserRegistration } from './user.model';
import { IOrder } from '../order/order.model';
import mongoose from 'mongoose';

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

  async findById(id: string): Promise<IUser | null> {
    try {
      const user = await UserSchema.findById(id).exec();
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
      return await OrderSchema.find({ userId: new mongoose.Types.ObjectId(userId) })
        .populate('pickupAddress')
        .populate('deliveryAddress')
        .sort({ createdAt: -1 });
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

  private toUserResponse(user: IUserDocument): IUser {
    const userObject = user.toObject();
    return {
      ...userObject,
      _id: userObject._id.toString(),
    } as IUser;
  }
}