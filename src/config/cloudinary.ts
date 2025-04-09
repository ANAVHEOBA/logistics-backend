import { v2 as cloudinary } from 'cloudinary';
import { config } from './environment';

// Configure Cloudinary with credentials from environment
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

// Define upload options
const uploadOptions = {
  folder: config.cloudinary.folder,
  allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  transformation: [
    { width: 1000, height: 1000, crop: 'limit' }, // Limit max dimensions
    { quality: 'auto' } // Automatic quality optimization
  ]
};

export { cloudinary, uploadOptions }; 