import mongoose from 'mongoose';
import { config } from './environment';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};