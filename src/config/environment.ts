import dotenv from 'dotenv';
dotenv.config();

const formatMongoDBUri = (uri: string): string => {
  const baseUri = uri.split('?')[0];
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
      pass: process.env.EMAIL_PASSWORD,
    },
  },

  bankAccounts: {
    default: {
      accountName: process.env.BANK_ACCOUNT_NAME || 'Default Account',
      accountNumber: process.env.BANK_ACCOUNT_NUMBER || '0123456789',
      bankName: process.env.BANK_NAME || 'Default Bank',
    },
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    folder: process.env.CLOUDINARY_FOLDER || 'products',
  },

  firebase: {
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  },

  /* NEW KEYS */
  googleClientId:     process.env.GOOGLE_CLIENT_ID     || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',

  /* KUDI SMS*/
  kudismsAPIkey: process.env.KUDISMS_API_KEY || '',
  kudismsWhatsAppTemplate: process.env.KUDISMS_WHATSAPP_TEMPLATE || '',
  kudismsWhatsAppURL: process.env.KUDISMS_WHATSAPP_URL || '',
};
