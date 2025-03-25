import mongoose, { Schema } from 'mongoose';
import { IStore, StoreCategory, StoreStatus } from './store.model';

const storeSchema = new Schema<IStore>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  storeName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // ... rest of the schema from store.model.ts ...
});

// Add the method implementation
storeSchema.methods.getStoreUrl = function(): string {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:5000/store/${this.slug}`;
  }
  return `https://yourapp.com/store/${this.slug}`;
};

export const Store = mongoose.model<IStore>('Store', storeSchema); 