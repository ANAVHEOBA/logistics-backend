import { Store, IStore, StoreStatus } from './store.model';
import mongoose from 'mongoose';

interface ListStoresParams {
  filter?: Record<string, any>;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  city?: string;
  state?: string;
  country?: string;
  minRating?: number;
}

export class StoreCrud {
  async createStore(storeData: Partial<IStore>): Promise<IStore> {
    const store = new Store(storeData);
    return await store.save();
  }

  async findByUserId(userId: string): Promise<IStore | null> {
    console.log('Finding store for userId:', userId);
    try {
      const objectId = new mongoose.Types.ObjectId(userId);
      console.log('Query:', { userId: objectId });
      const store = await Store.findOne({ userId: objectId });
      console.log('Store found:', store);
      return store;
    } catch (error) {
      console.error('Error finding store:', error);
      throw error;
    }
  }

  async findByStoreName(storeName: string): Promise<IStore | null> {
    return await Store.findOne({ storeName });
  }

  async updateStore(storeId: string, updateData: Partial<IStore>): Promise<IStore | null> {
    return await Store.findByIdAndUpdate(
      storeId,
      { $set: updateData },
      { new: true }
    );
  }

  async getStoreMetrics(storeId: string) {
    return await Store.findById(storeId).select('metrics');
  }

  async updateMetrics(storeId: string, metrics: Partial<IStore['metrics']>) {
    return await Store.findByIdAndUpdate(
      storeId,
      { $set: { metrics } },
      { new: true }
    );
  }

  async findBySlug(slug: string): Promise<IStore | null> {
    return await Store.findOne({ 
      slug,
      status: { $in: [StoreStatus.ACTIVE, StoreStatus.PENDING] }
    });
  }

  async getPublicStoreData(slug: string): Promise<IStore | null> {
    return await Store.findOne(
      { 
        slug,
        status: { $in: [StoreStatus.ACTIVE, StoreStatus.PENDING] }
      },
      {
        userId: 0,
        businessInfo: 0,
        metrics: 0,
        settings: 0
      }
    );
  }

  async deleteStore(userId: string): Promise<boolean> {
    const result = await Store.deleteOne({ userId });
    return result.deletedCount > 0;
  }

  async activateStore(storeId: string): Promise<IStore | null> {
    return await Store.findByIdAndUpdate(
      storeId,
      { 
        $set: { 
          status: StoreStatus.ACTIVE 
        } 
      },
      { new: true }
    );
  }

  async listStores({
    filter = {},
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    city,
    state,
    country,
    minRating
  }: ListStoresParams) {
    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Combine with existing filter
    const finalFilter: Record<string, any> = {
      ...filter,
      status: StoreStatus.ACTIVE
    };

    // Add location filters if provided
    if (city) {
      finalFilter['address.city'] = { $regex: city, $options: 'i' };
    }
    if (state) {
      finalFilter['address.state'] = { $regex: state, $options: 'i' };
    }
    if (country) {
      finalFilter['address.country'] = { $regex: country, $options: 'i' };
    }

    // Add rating filter if provided
    if (minRating) {
      finalFilter['metrics.averageRating'] = { $gte: Number(minRating) };
    }

    const stores = await Store
      .find(finalFilter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-userId -settings.privateData');

    const total = await Store.countDocuments(finalFilter);

    return {
      stores,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total
      }
    };
  }

  async findById(storeId: string): Promise<IStore | null> {
    try {
      return await Store.findById(storeId);
    } catch (error) {
      console.error('Error finding store by ID:', error);
      throw error;
    }
  }
} 