import { Product, IProduct, ProductStatus } from './product.model';
import { FilterQuery } from 'mongoose';

export class ProductCrud {
  async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
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
} 