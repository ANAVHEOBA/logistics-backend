import { Request, Response } from 'express';
import { ProductCrud } from './product.crud';
import { StoreCrud } from '../store/store.crud';
import { ProductStatus } from './product.model';
import { IStore } from '../store/store.model';
import mongoose from 'mongoose';
import { Product } from './product.model';
import { FilterQuery } from 'mongoose';
import { IProduct } from './product.model';
import { uploadService } from '../../services/upload.service';

interface AuthUser {
  userId: string;
  email: string;
  _id: mongoose.Types.ObjectId;
}

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    _id: mongoose.Types.ObjectId;
  };
  files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
}

export class ProductController {
  private productCrud: ProductCrud;
  private storeCrud: StoreCrud;

  constructor() {
    this.productCrud = new ProductCrud();
    this.storeCrud = new StoreCrud();
  }

  createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId) as IStore;
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      // Handle image uploads
      const uploadedImages: { url: string; publicId: string }[] = [];
      const files = Array.isArray(req.files) ? req.files : Object.values(req.files || {}).flat();
      
      if (files.length) {
        const results = await uploadService.uploadMultipleImages(files);
        uploadedImages.push(...results.map(img => ({
          url: img.secure_url,
          publicId: img.public_id
        })));
      }

      // Convert specifications object to Map
      const specifications = new Map(
        Object.entries(req.body.specifications || {})
      );

      const productData = {
        ...req.body,
        storeId: store._id,
        status: ProductStatus.ACTIVE,
        images: uploadedImages,
        specifications // Use the converted Map
      };

      const product = await this.productCrud.createProduct(productData);

      // Update store metrics
      await this.storeCrud.updateMetrics(store._id.toString(), {
        totalProducts: (store.metrics?.totalProducts || 0) + 1
      });

      res.status(201).json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create product'
      });
    }
  };

  getStoreProducts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId) as IStore;
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const { page, limit, category, status, search } = req.query;

      const products = await this.productCrud.getStoreProducts(store._id.toString(), {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        category: category as string,
        status: status as ProductStatus,
        search: search as string
      });

      res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      console.error('Get products error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get products'
      });
    }
  };

  updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;
      const userId = req.user?.userId;
      
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const product = await this.productCrud.getProductById(productId);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found'
        });
        return;
      }

      // Handle new image uploads
      let updatedImages = [...product.images];
      const files = Array.isArray(req.files) ? req.files : Object.values(req.files || {}).flat();
      
      if (files.length) {
        const results = await uploadService.uploadMultipleImages(files);
        updatedImages.push(...results.map(img => ({
          url: img.secure_url,
          publicId: img.public_id
        })));
      }

      const updateData = {
        ...req.body,
        images: updatedImages
      };

      const updatedProduct = await this.productCrud.updateProduct(productId, updateData);

      res.status(200).json({
        success: true,
        data: updatedProduct
      });
    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update product'
      });
    }
  };

  deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const store = await this.storeCrud.findByUserId(userId) as IStore;
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      const product = await this.productCrud.getProductById(productId);
      if (!product || product.storeId.toString() !== store._id.toString()) {
        res.status(404).json({
          success: false,
          message: 'Product not found'
        });
        return;
      }

      await this.productCrud.deleteProduct(productId);

      // Update store metrics
      await this.storeCrud.updateMetrics(store._id.toString(), {
        totalProducts: Math.max((store.metrics?.totalProducts || 1) - 1, 0)
      });

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      console.error('Delete product error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete product'
      });
    }
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;
      const product = await this.productCrud.getProductById(productId);

      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error('Get product error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get product'
      });
    }
  };

  getStoreProductsPublic = async (req: Request, res: Response): Promise<void> => {
    try {
      const { storeId } = req.params;
      const { page, limit, category, search } = req.query;

      const products = await this.productCrud.getStoreProducts(storeId, {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        category: category as string,
        status: ProductStatus.ACTIVE, // Only show active products
        search: search as string
      });

      res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      console.error('Get public products error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get products'
      });
    }
  };

  searchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { query, category, minPrice, maxPrice, page, limit } = req.query;
      
      const filter: FilterQuery<IProduct> = { 
        status: ProductStatus.ACTIVE,
        isPublished: true // Only show published products
      };

      // Add category filter
      if (category) {
        filter.category = category;
      }

      // Add price range filter
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }

      // Add text search
      if (query) {
        filter.$or = [
          { name: { $regex: query as string, $options: 'i' } },
          { description: { $regex: query as string, $options: 'i' } }
        ];
      }

      const products = await this.productCrud.searchProducts({
        filter,
        page: Number(page) || 1,
        limit: Number(limit) || 10
      });

      res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      console.error('Search products error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search products'
      });
    }
  };

  getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category } = req.params;
      const { page, limit } = req.query;

      const filter = {
        category,
        status: ProductStatus.ACTIVE
      };

      const products = await Product.find(filter)
        .skip((Number(page) || 0) * (Number(limit) || 10))
        .limit(Number(limit) || 10)
        .sort({ createdAt: -1 });

      const total = await Product.countDocuments(filter);

      res.status(200).json({
        success: true,
        data: {
          products,
          total,
          page: Number(page) || 0,
          totalPages: Math.ceil(total / (Number(limit) || 10))
        }
      });
    } catch (error) {
      console.error('Get products by category error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get products'
      });
    }
  };

  getGuestOrderableProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { storeId } = req.params;
      const products = await this.productCrud.getGuestOrderableProducts(storeId);

      res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      console.error('Get guest orderable products error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get products'
      });
    }
  };

  validateGuestOrderQuantity = async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId, quantity } = req.body;
      const result = await this.productCrud.validateGuestOrderQuantity(
        productId,
        quantity
      );

      if (!result.valid) {
        res.status(400).json({
          success: false,
          message: result.message
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.product
      });
    } catch (error) {
      console.error('Validate guest order quantity error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to validate order quantity'
      });
    }
  };

  uploadImages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.files || !Array.isArray(req.files)) {
        res.status(400).json({
          success: false,
          message: 'No images uploaded'
        });
        return;
      }

      const uploadedImages = await uploadService.uploadMultipleImages(req.files);
      
      res.status(200).json({
        success: true,
        data: uploadedImages.map(img => ({
          url: img.secure_url,
          publicId: img.public_id
        }))
      });
    } catch (error) {
      console.error('Image upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload images'
      });
    }
  };

  deleteImage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { productId, imageId } = req.params;
      const product = await this.productCrud.getProductById(productId);
      
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found'
        });
        return;
      }

      const image = product.images.find(img => img.publicId === imageId);
      if (!image) {
        res.status(404).json({
          success: false,
          message: 'Image not found'
        });
        return;
      }

      await uploadService.deleteImage(image.publicId);
      await this.productCrud.updateProduct(productId, {
        images: product.images.filter(img => img.publicId !== imageId)
      });

      res.status(200).json({
        success: true,
        message: 'Image deleted successfully'
      });
    } catch (error) {
      console.error('Delete image error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete image'
      });
    }
  };
} 