import { Product, IProduct, ProductStatus } from './product.model';
import { FilterQuery } from 'mongoose';
import mongoose from 'mongoose';
import { uploadService } from '../../services/upload.service';

export class ProductCrud {
  async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    // Convert Map to plain object if it's a Map
    if (productData.specifications instanceof Map) {
      productData.specifications = Object.fromEntries(productData.specifications);
    }
    
    const product = new Product(productData);
    return await product.save();
  }

  async getStoreProducts(
    storeId: string,
    query: {
      page?: number;
      limit?: number;
      category?: string;
      status?: ProductStatus;
      search?: string;
    }
  ) {
    const { page = 1, limit = 10, category, status, search } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<IProduct> = { storeId };

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Product.countDocuments(filter)
    ]);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getProductById(productId: string): Promise<IProduct | null> {
    return await Product.findById(productId);
  }

  async updateProduct(
    productId: string,
    updateData: Partial<IProduct>
  ): Promise<IProduct | null> {
    return await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true }
    );
  }

  async deleteProduct(productId: string): Promise<boolean> {
    const product = await Product.findById(productId);
    if (product) {
      // Delete images from Cloudinary
      const deletePromises = product.images.map(img => 
        uploadService.deleteImage(img.publicId)
      );
      await Promise.all(deletePromises);
    }
    const result = await Product.deleteOne({ _id: productId });
    return result.deletedCount === 1;
  }

  async updateStock(productId: string, quantity: number): Promise<IProduct | null> {
    return await Product.findByIdAndUpdate(
      productId,
      { 
        $inc: { stock: -quantity },
        $set: { 
          status: quantity > 0 ? ProductStatus.ACTIVE : ProductStatus.OUT_OF_STOCK 
        }
      },
      { new: true }
    );
  }

  async getProductsByIds(productIds: string[]): Promise<IProduct[]> {
    return await Product.find({ _id: { $in: productIds } });
  }

  async searchProducts({
    filter,
    page = 1,
    limit = 10,
    sort = { createdAt: -1 }
  }: {
    filter: FilterQuery<IProduct>;
    page?: number;
    limit?: number;
    sort?: Record<string, 1 | -1>;
  }) {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort),
      Product.countDocuments(filter)
    ]);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getGuestOrderableProducts(storeId: string): Promise<IProduct[]> {
    return await Product.find({
      storeId,
      status: ProductStatus.ACTIVE,
      isPublished: true,
      guestOrderEnabled: true,
      stock: { $gt: 0 }
    });
  }

  async validateGuestOrderQuantity(
    productId: string,
    quantity: number
  ): Promise<{ 
    valid: boolean;
    message?: string;
    product?: IProduct 
  }> {
    const product = await this.getProductById(productId);
    
    if (!product) {
      return { valid: false, message: 'Product not found' };
    }

    if (!product.guestOrderEnabled) {
      return { valid: false, message: 'Product not available for guest orders' };
    }

    if (quantity < product.minOrderQuantity) {
      return { 
        valid: false, 
        message: `Minimum order quantity is ${product.minOrderQuantity}`,
        product 
      };
    }

    if (quantity > product.maxOrderQuantity) {
      return { 
        valid: false, 
        message: `Maximum order quantity is ${product.maxOrderQuantity}`,
        product 
      };
    }

    if (quantity > product.stock) {
      return { 
        valid: false, 
        message: `Only ${product.stock} items available`,
        product 
      };
    }

    return { valid: true, product };
  }

  async reserveProductStock(
    productId: string,
    quantity: number,
    session?: mongoose.ClientSession
  ): Promise<boolean> {
    const product = await Product.findOneAndUpdate(
      {
        _id: productId,
        stock: { $gte: quantity }
      },
      {
        $inc: { stock: -quantity },
        $push: {
          reservations: {
            quantity,
            expiresAt: new Date(Date.now() + 15 * 60000)
          }
        }
      },
      { new: true, session }
    );

    return !!product;
  }
} 