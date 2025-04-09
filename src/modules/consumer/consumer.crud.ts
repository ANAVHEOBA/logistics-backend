import { ConsumerSchema } from './consumer.schema';
import { IConsumerDocument, IConsumerBase } from './consumer.model';
import mongoose from 'mongoose';
import { OrderSchema } from '../order/order.schema';
import { ProductSchema } from '../product/product.schema';
import { Store } from '../store/store.model';

interface PreferencesAnalytics {
  favoriteStores: Array<{
    storeId: string;
    storeName: string;
    orderCount: number;
    totalSpent: number;
    lastOrderDate: Date;
  }>;
  categoryPreferences: Array<{
    category: string;
    orderCount: number;
    totalSpent: number;
  }>;
  deliveryPreferences: {
    commonAddresses: Array<{
      address: string;
      useCount: number;
    }>;
    expressDeliveryRate: number;
    preferredPackageSizes: Array<{
      size: string;
      count: number;
    }>;
  };
  productPreferences: Array<{
    productId: string;
    productName: string;
    orderCount: number;
    lastOrdered: Date;
  }>;
}

interface AnalyticsOverview {
  totalOrders: number;
  totalSpent: number;
  favoriteStore: {
    storeName: string;
    orderCount: number;
  };
  mostOrderedProduct: {
    productName: string;
    orderCount: number;
  };
  recentActivity: {
    lastOrderDate: Date;
    orderFrequency: string;
  };
}

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

  async getPreferencesAnalytics(consumerId: string): Promise<PreferencesAnalytics> {
    try {
      const [
        storePreferences,
        categoryPreferences,
        deliveryStats,
        productPreferences
      ] = await Promise.all([
        this.getFavoriteStores(consumerId),
        this.getCategoryPreferences(consumerId),
        this.getDeliveryPreferences(consumerId),
        this.getProductPreferences(consumerId)
      ]);

      return {
        favoriteStores: storePreferences,
        categoryPreferences,
        deliveryPreferences: deliveryStats,
        productPreferences
      };
    } catch (error) {
      console.error('Get preferences analytics error:', error);
      throw error;
    }
  }

  async getAnalyticsOverview(consumerId: string): Promise<AnalyticsOverview> {
    const orders = await OrderSchema.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(consumerId),
          status: 'CONFIRMED'  // Changed from paymentStatus: 'VERIFIED'
        }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$price' },
          lastOrderDate: { $max: '$createdAt' }
        }
      }
    ]);

    const favoriteStore = await this.getTopStore(consumerId);
    const topProduct = await this.getTopProduct(consumerId);

    const stats = orders[0] || {
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: null
    };

    return {
      totalOrders: stats.totalOrders,
      totalSpent: stats.totalSpent,
      favoriteStore: {
        storeName: favoriteStore?.storeName || 'N/A',
        orderCount: favoriteStore?.orderCount || 0
      },
      mostOrderedProduct: {
        productName: topProduct?.productName || 'N/A',
        orderCount: topProduct?.orderCount || 0
      },
      recentActivity: {
        lastOrderDate: stats.lastOrderDate,
        orderFrequency: this.calculateOrderFrequency(
          stats.totalOrders,
          stats.lastOrderDate
        )
      }
    };
  }

  private async getFavoriteStores(consumerId: string) {
    return await OrderSchema.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(consumerId),
          status: 'CONFIRMED'  // Changed from paymentStatus: 'VERIFIED'
        }
      },
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: '$items.storeId',
          orderCount: { $sum: 1 },
          totalSpent: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
          lastOrderDate: { $max: '$createdAt' }
        }
      },
      {
        $lookup: {
          from: 'stores',
          localField: '_id',
          foreignField: '_id',
          as: 'storeInfo'
        }
      },
      {
        $project: {
          storeId: '$_id',
          storeName: { $arrayElemAt: ['$storeInfo.name', 0] },
          orderCount: 1,
          totalSpent: 1,
          lastOrderDate: 1
        }
      },
      {
        $sort: { orderCount: -1 }
      },
      {
        $limit: 5
      }
    ]);
  }

  private async getCategoryPreferences(consumerId: string) {
    return await OrderSchema.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(consumerId)
        }
      },
      {
        $unwind: '$items'
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productInfo'
        }
      },
      {
        $group: {
          _id: { $arrayElemAt: ['$productInfo.category', 0] },
          orderCount: { $sum: 1 },
          totalSpent: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      {
        $project: {
          category: '$_id',
          orderCount: 1,
          totalSpent: 1,
          _id: 0
        }
      },
      {
        $sort: { orderCount: -1 }
      }
    ]);
  }

  private async getDeliveryPreferences(consumerId: string) {
    const deliveryStats = await OrderSchema.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(consumerId),
          status: 'CONFIRMED'  // Changed from paymentStatus: 'VERIFIED'
        }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          expressDeliveries: {
            $sum: { $cond: ['$isExpressDelivery', 1, 0] }
          },
          addresses: {
            $push: {
              address: '$deliveryAddress.street',
              city: '$deliveryAddress.city'
            }
          },
          packageSizes: { $push: '$packageSize' }
        }
      }
    ]);

    const stats = deliveryStats[0] || {
      totalOrders: 0,
      expressDeliveries: 0,
      addresses: [],
      packageSizes: []
    };

    // Process addresses
    const addressCounts = stats.addresses.reduce((acc: any, curr: any) => {
      const fullAddress = `${curr.address}, ${curr.city}`;
      acc[fullAddress] = (acc[fullAddress] || 0) + 1;
      return acc;
    }, {});

    // Process package sizes
    const packageSizeCounts = stats.packageSizes.reduce((acc: any, curr: string) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    return {
      commonAddresses: Object.entries(addressCounts)
        .map(([address, count]) => ({ address, useCount: count as number }))
        .sort((a, b) => b.useCount - a.useCount)
        .slice(0, 3),
      expressDeliveryRate: stats.totalOrders ? 
        (stats.expressDeliveries / stats.totalOrders) * 100 : 0,
      preferredPackageSizes: Object.entries(packageSizeCounts)
        .map(([size, count]) => ({ size, count: count as number }))
        .sort((a, b) => b.count - a.count)
    };
  }

  private async getProductPreferences(consumerId: string) {
    return await OrderSchema.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(consumerId),
          status: 'CONFIRMED'  // Changed from paymentStatus: 'VERIFIED'
        }
      },
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: '$items.productId',
          orderCount: { $sum: 1 },
          lastOrdered: { $max: '$createdAt' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productInfo'
        }
      },
      {
        $project: {
          productId: '$_id',
          productName: { $arrayElemAt: ['$productInfo.name', 0] },
          orderCount: 1,
          lastOrdered: 1
        }
      },
      {
        $sort: { orderCount: -1 }
      },
      {
        $limit: 10
      }
    ]);
  }

  private calculateOrderFrequency(
    totalOrders: number,
    lastOrderDate: Date
  ): string {
    if (!lastOrderDate) return 'N/A';

    const daysDiff = Math.ceil(
      (new Date().getTime() - lastOrderDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 0) return 'First order today';

    const ordersPerDay = totalOrders / daysDiff;
    const ordersPerWeek = ordersPerDay * 7;
    const ordersPerMonth = ordersPerDay * 30;

    if (ordersPerMonth < 1) {
      return `${ordersPerMonth.toFixed(1)} orders per month`;
    } else if (ordersPerWeek < 1) {
      return `${ordersPerWeek.toFixed(1)} orders per week`;
    } else {
      return `${ordersPerDay.toFixed(1)} orders per day`;
    }
  }

  private async getTopStore(consumerId: string) {
    const stores = await this.getFavoriteStores(consumerId);
    return stores[0];
  }

  private async getTopProduct(consumerId: string) {
    const products = await this.getProductPreferences(consumerId);
    return products[0];
  }
}