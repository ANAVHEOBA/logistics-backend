import { Request, Response } from 'express';
import { Cart, ICartItem } from './cart.model';
import { Product, IProduct } from '../product/product.model';
import { addToCartSchema, updateCartItemSchema } from './cart.schema';
import { validateRequest } from '../../middleware/validate-request';
import { NotFoundError } from '../../errors/not-found-error';
import { BadRequestError } from '../../errors/bad-request-error';
import { Types } from 'mongoose';

export class CartController {
  static async getCart(req: Request, res: Response): Promise<void> {
    const cart = await Cart.findOne({ userId: req.consumer?.consumerId });
    if (!cart) {
      res.status(200).json({
        success: true,
        data: { items: [], totalPrice: 0 }
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: cart
    });
  }

  static async addToCart(req: Request, res: Response): Promise<void> {
    const { productId, quantity, variantData } = req.body;
    
    // Find product
    const product = await Product.findById(productId).lean();
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // Check stock
    if (product.stock < quantity) {
      throw new BadRequestError('Insufficient stock');
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.consumer?.consumerId });
    if (!cart) {
      cart = new Cart({ userId: req.consumer?.consumerId });
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      (item: ICartItem) => item.productId.toString() === productId
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const cartItem: ICartItem = {
        productId: new Types.ObjectId(product._id.toString()),
        storeId: new Types.ObjectId(product.storeId.toString()),
        quantity,
        price: product.price,
        name: product.name,
        variantData,
        addedAt: new Date()
      };
      cart.items.push(cartItem);
    }

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart
    });
  }

  static async updateCartItem(req: Request, res: Response): Promise<void> {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.consumer?.consumerId });
    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      (item: ICartItem) => item._id?.toString() === itemId
    );

    if (itemIndex === -1) {
      throw new NotFoundError('Item not found in cart');
    }

    // Check product stock
    const product = await Product.findById(cart.items[itemIndex].productId).lean();
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (product.stock < quantity) {
      throw new BadRequestError('Insufficient stock');
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  }

  static async removeFromCart(req: Request, res: Response): Promise<void> {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId: req.consumer?.consumerId });
    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    cart.items = cart.items.filter(
      (item: ICartItem) => item._id?.toString() !== itemId
    );

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart
    });
  }

  static async clearCart(req: Request, res: Response): Promise<void> {
    const cart = await Cart.findOne({ userId: req.consumer?.consumerId });
    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  }
} 