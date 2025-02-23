import { Store, IStore, StoreStatus } from './store.model';
import mongoose from 'mongoose';

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
} 