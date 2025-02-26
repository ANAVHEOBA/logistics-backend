import mongoose, { ConnectOptions } from 'mongoose';
import { config } from './environment';

export const connectDatabase = async (): Promise<void> => {
  try {
    // Updated MongoDB connection options for Atlas
    const options: ConnectOptions = {
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000, // Increased timeout
      socketTimeoutMS: 45000, // Added socket timeout
      family: 4, // Use IPv4, skip trying IPv6
      tls: true, // Required for Atlas
      authSource: 'admin',
      replicaSet: 'atlas-1493kd-shard-0',
      directConnection: false
    };

    // Add connection retry logic
    let retries = 5;
    while (retries > 0) {
      try {
        const conn = await mongoose.connect(config.mongodbUri, options);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Add connection event listeners
        mongoose.connection.on('error', (err) => {
          console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
          console.log('MongoDB disconnected');
          // Attempt to reconnect
          setTimeout(async () => {
            try {
              await mongoose.connect(config.mongodbUri, options);
              console.log('MongoDB reconnected');
            } catch (error) {
              console.error('MongoDB reconnection failed:', error);
            }
          }, 5000);
        });

        break; // Connection successful, exit retry loop
      } catch (error) {
        retries--;
        if (retries === 0) {
          throw error; // No more retries left
        }
        console.log(`Connection failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
      }
    }

  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    }
  }
};