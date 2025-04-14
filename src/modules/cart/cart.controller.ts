import { Request, Response } from 'express';
import { Cart, ICartItem } from './cart.model';
import { Product } from '../product/product.model';
import { addToCartSchema, updateCartItemSchema, checkoutCartSchema } from './cart.schema';
import { validateRequest } from '../../middleware/validate-request';
import { NotFoundError } from '../../errors/not-found-error';
import { BadRequestError } from '../../errors/bad-request-error';
import { OrderController } from '../order/order.controller';
import { Types } from 'mongoose';
import { IOrder, ICartCheckoutRequest } from '../order/order.model';
import { config } from '../../config/environment';
import { generatePaymentReference } from '../../utils/payment.helper';
import { ZoneCrud } from '../zone/zone.crud';
import { Store } from '../store/store.model';
import { StoreCrud } from '../store/store.crud';

export class CartController {
  private static orderController: OrderController = new OrderController();
  private static zoneCrud: ZoneCrud = new ZoneCrud();
  private static storeCrud: StoreCrud = new StoreCrud();

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

  static async checkout(req: Request, res: Response): Promise<void> {
    try {
      const cart = await Cart.findOne({ userId: req.consumer?.consumerId });
      if (!cart || cart.items.length === 0) {
        throw new BadRequestError('Cart is empty');
      }

      // Group items by store
      const storeItems = cart.items.reduce((acc, item) => {
        const storeId = item.storeId.toString();
        if (!acc[storeId]) {
          acc[storeId] = [];
        }
        acc[storeId].push(item);
        return acc;
      }, {} as Record<string, ICartItem[]>);

      // Get zone price for the delivery zone
      const zone = await CartController.zoneCrud.getZoneById(req.body.zoneId);
      if (!zone) {
        throw new BadRequestError('Invalid delivery zone');
      }
      const zonePrice = zone.deliveryPrice || 0;

      // Calculate total product price for all items
      const productTotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      const totalPrice = productTotal + zonePrice;

      // Verify all stores exist and are active
      for (const [storeId, items] of Object.entries(storeItems)) {
        const store = await CartController.storeCrud.findById(storeId);
        if (!store) {
          throw new NotFoundError(`Store not found: ${storeId}`);
        }
        // Allow ACTIVE and PENDING stores
        if (store.status !== 'ACTIVE' && store.status !== 'PENDING') {
          throw new BadRequestError(`Store ${store.storeName} is not available for orders (status: ${store.status})`);
        }
      }

      // Create cart checkout request
      const cartCheckoutRequest: ICartCheckoutRequest = {
        orders: Object.entries(storeItems).map(([storeId, items]) => {
          // Calculate total product price for this store's items
          const storeProductTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
          const storeTotalPrice = storeProductTotal + zonePrice;

          return {
            storeId: storeId,
            items: items.map(item => ({
              productId: item.productId.toString(),
              quantity: item.quantity,
              variantData: item.variantData,
              price: item.price
            })),
            deliveryAddress: req.body.deliveryAddress,
            packageSize: req.body.packageSize || 'SMALL',
            isFragile: req.body.isFragile || false,
            isExpressDelivery: req.body.isExpressDelivery || false,
            requiresSpecialHandling: req.body.requiresSpecialHandling || false,
            specialInstructions: req.body.specialInstructions || '',
            zoneId: req.body.zoneId,
            zonePrice: zonePrice,
            paymentMethod: req.body.paymentMethod || 'BANK_TRANSFER',
            totalPrice: storeTotalPrice
          };
        })
      };

      // Create a mock response object to capture the order data
      let ordersResponse: any = null;
      const mockRes = {
        status: (code: number) => mockRes,
        json: (data: { success: boolean; data: IOrder[] }) => {
          if (data.success && data.data) {
            ordersResponse = data.data;
          }
          return mockRes;
        }
      } as Response;

      // Use the new cart checkout endpoint
      await CartController.orderController.processCartCheckout(
        { ...req, body: cartCheckoutRequest } as Request,
        mockRes
      );

      // Only clear cart if orders were created successfully
      if (ordersResponse && ordersResponse.length > 0) {
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        // Add payment instructions to the response
        const responseData = ordersResponse.map((order: IOrder) => ({
          ...order,
          paymentInstructions: {
            reference: order.paymentReference,
            bankDetails: config.bankAccounts.default,
            amount: order.price,
            deliveryFee: zonePrice,
            subtotal: order.price - zonePrice,
            currency: 'NGN',
            instructions: "Please transfer the exact amount in Naira and use your payment reference as the transaction description."
          }
        }));

        // Send final response with all order details
        res.status(201).json({
          success: true,
          data: responseData
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to create orders'
        });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to process checkout'
      });
    }
  }
} 