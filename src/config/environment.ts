import dotenv from 'dotenv';

dotenv.config();

// Ensure the MongoDB URI is properly formatted
const formatMongoDBUri = (uri: string): string => {
  // Remove any existing query parameters
  const baseUri = uri.split('?')[0];
  // Add required query parameters for Atlas
  return `${baseUri}?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`;
};

export const config = {
  port: process.env.PORT || 5000,
  mongodbUri: formatMongoDBUri(process.env.MONGODB_URI || 'mongodb://localhost:27017/logistics'),
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  nodeEnv: process.env.NODE_ENV || 'development',
  baseUrl: process.env.BASE_URL || 'http://localhost:5000',
  email: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  },
  // Add bank account details
  bankAccounts: {
    default: {
      accountName: process.env.BANK_ACCOUNT_NAME || 'Default Account',
      accountNumber: process.env.BANK_ACCOUNT_NUMBER || '0123456789',
      bankName: process.env.BANK_NAME || 'Default Bank'
    }
  }
};