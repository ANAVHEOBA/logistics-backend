import { cloudinary, uploadOptions } from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { Request } from 'express';

// Define the File type
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export class UploadService {
  /**
   * Upload a single image to Cloudinary
   */
  async uploadImage(file: MulterFile): Promise<UploadApiResponse> {
    try {
      // Convert file buffer to base64
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;
      
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        ...uploadOptions,
        resource_type: 'auto'
      });
      
      return result;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image');
    }
  }

  /**
   * Upload multiple images to Cloudinary
   */
  async uploadMultipleImages(files: MulterFile[]): Promise<UploadApiResponse[]> {
    try {
      const uploadPromises = files.map(file => this.uploadImage(file));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Multiple images upload error:', error);
      throw new Error('Failed to upload images');
    }
  }

  /**
   * Delete an image from Cloudinary
   */
  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Image deletion error:', error);
      throw new Error('Failed to delete image');
    }
  }

  /**
   * Delete multiple images from Cloudinary
   */
  async deleteMultipleImages(publicIds: string[]): Promise<void> {
    try {
      const deletePromises = publicIds.map(publicId => this.deleteImage(publicId));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Multiple images deletion error:', error);
      throw new Error('Failed to delete images');
    }
  }
}

export const uploadService = new UploadService(); 