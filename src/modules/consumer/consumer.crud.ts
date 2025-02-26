import { ConsumerSchema } from './consumer.schema';
import { IConsumerDocument, IConsumerBase } from './consumer.model';
import mongoose from 'mongoose';
import { OrderSchema } from '../order/order.schema';

export class ConsumerCrud {
  async createConsumer(consumerData: Partial<IConsumerBase>): Promise<IConsumerDocument> {
    const consumer = new ConsumerSchema(consumerData);
    return await consumer.save();
  }

  async findByEmail(email: string): Promise<IConsumerDocument | null> {
    return await ConsumerSchema.findOne({ email });
  }

  async findById(id: string): Promise<IConsumerDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await ConsumerSchema.findById(id);
  }

  async verifyEmail(consumerId: string): Promise<IConsumerDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(consumerId)) return null;
    
    return await ConsumerSchema.findByIdAndUpdate(
      consumerId,
      {
        $set: {
          isEmailVerified: true,
          status: 'active',
          verificationCode: '',
          verificationCodeExpiry: new Date()
        }
      },
      { new: true }
    );
  }

  async updateLastLogin(consumerId: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(consumerId)) return;
    
    await ConsumerSchema.findByIdAndUpdate(
      consumerId,
      {
        $set: { lastLoginAt: new Date() }
      }
    );
  }

  async addFavoriteStore(consumerId: string, storeId: string): Promise<IConsumerDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(consumerId) || 
        !mongoose.Types.ObjectId.isValid(storeId)) return null;

    return await ConsumerSchema.findByIdAndUpdate(
      consumerId,
      {
        $addToSet: { 'preferences.favoriteStores': storeId }
      },
      { new: true }
    );
  }

  async removeFavoriteStore(consumerId: string, storeId: string): Promise<IConsumerDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(consumerId) || 
        !mongoose.Types.ObjectId.isValid(storeId)) return null;

    return await ConsumerSchema.findByIdAndUpdate(
      consumerId,
      {
        $pull: { 'preferences.favoriteStores': storeId }
      },
      { new: true }
    );
  }

  async updatePreferredCategories(
    consumerId: string, 
    categories: string[]
  ): Promise<IConsumerDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(consumerId)) return null;

    return await ConsumerSchema.findByIdAndUpdate(
      consumerId,
      {
        $set: { 'preferences.preferredCategories': categories }
      },
      { new: true }
    );
  }

  async updateProfile(
    consumerId: string,
    updates: Partial<IConsumerBase>
  ): Promise<IConsumerDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(consumerId)) return null;

    // Remove sensitive fields that shouldn't be updated directly
    const { password, email, isEmailVerified, verificationCode, ...safeUpdates } = updates;

    return await ConsumerSchema.findByIdAndUpdate(
      consumerId,
      { $set: safeUpdates },
      { new: true }
    );
  }

  async setPasswordResetToken(
    email: string,
    token: string,
    expiry: Date
  ): Promise<IConsumerDocument | null> {
    return await ConsumerSchema.findOneAndUpdate(
      { email },
      {
        $set: {
          passwordResetToken: token,
          passwordResetExpiry: expiry
        }
      },
      { new: true }
    );
  }

  async updatePassword(
    consumerId: string,
    hashedPassword: string
  ): Promise<IConsumerDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(consumerId)) return null;

    return await ConsumerSchema.findByIdAndUpdate(
      consumerId,
      {
        $set: {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetExpiry: null
        }
      },
      { new: true }
    );
  }

  async findAllConsumers(
    page: number,
    limit: number,
    filters: { status?: 'active' | 'inactive'; search?: string }
  ) {
    const query: any = {};
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    if (filters.search) {
      query.$or = [
        { email: { $regex: filters.search, $options: 'i' } },
        { firstName: { $regex: filters.search, $options: 'i' } },
        { lastName: { $regex: filters.search, $options: 'i' } },
        { phone: { $regex: filters.search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const [consumers, total] = await Promise.all([
      ConsumerSchema.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ConsumerSchema.countDocuments(query)
    ]);

    return { consumers, total };
  }

  async updateStatus(
    consumerId: string,
    status: 'active' | 'inactive'
  ): Promise<IConsumerDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(consumerId)) return null;

    return await ConsumerSchema.findByIdAndUpdate(
      consumerId,
      {
        $set: { 
          status,
          statusUpdatedAt: new Date()
        }
      },
      { new: true }
    );
  }

  async getStats() {
    try {
      const now = new Date();
      // Create new Date objects for each time period to avoid mutation
      const startOfToday = new Date(now);
      startOfToday.setHours(0, 0, 0, 0);

      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const startOfMonth = new Date(now);
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const [
        totalConsumers,
        activeConsumers,
        inactiveConsumers,
        newConsumersToday,
        newConsumersThisWeek,
        newConsumersThisMonth
      ] = await Promise.all([
        ConsumerSchema.countDocuments(),
        ConsumerSchema.countDocuments({ status: 'active' }),
        ConsumerSchema.countDocuments({ status: 'inactive' }),
        ConsumerSchema.countDocuments({
          createdAt: { $gte: startOfToday }
        }),
        ConsumerSchema.countDocuments({
          createdAt: { $gte: startOfWeek }
        }),
        ConsumerSchema.countDocuments({
          createdAt: { $gte: startOfMonth }
        })
      ]);

      return {
        total: totalConsumers,
        active: activeConsumers,
        inactive: inactiveConsumers,
        newToday: newConsumersToday,
        newThisWeek: newConsumersThisWeek,
        newThisMonth: newConsumersThisMonth
      };
    } catch (error) {
      console.error('Error getting consumer stats:', error);
      return null;
    }
  }

  async findConsumerOrders(
    consumerId: string,
    page: number,
    limit: number,
    status?: string
  ) {
    if (!mongoose.Types.ObjectId.isValid(consumerId)) {
      throw new Error('Invalid consumer ID');
    }

    const query: any = { userId: consumerId };
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    try {
      const [orders, total] = await Promise.all([
        OrderSchema.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        OrderSchema.countDocuments(query)
      ]);

      return {
        orders,
        total
      };
    } catch (error) {
      throw error;
    }
  }
}