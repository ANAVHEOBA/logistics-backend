import { Router, Request, Response, NextFunction } from 'express';
import { CartController } from './cart.controller';
import { authenticateConsumer } from '../../middleware/consumer.middleware';
import { validateRequest } from '../../middleware/validate-request';
import { addToCartSchema, updateCartItemSchema, checkoutCartSchema } from './cart.schema';

const router = Router();

// Get cart
router.get('/', authenticateConsumer, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await CartController.getCart(req, res);
    next();
  } catch (error) {
    next(error);
  }
});

// Add to cart
router.post(
  '/items',
  authenticateConsumer,
  validateRequest(addToCartSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await CartController.addToCart(req, res);
      next();
    } catch (error) {
      next(error);
    }
  }
);

// Update cart item
router.patch(
  '/items/:itemId',
  authenticateConsumer,
  validateRequest(updateCartItemSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await CartController.updateCartItem(req, res);
      next();
    } catch (error) {
      next(error);
    }
  }
);

// Remove from cart
router.delete(
  '/items/:itemId',
  authenticateConsumer,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await CartController.removeFromCart(req, res);
      next();
    } catch (error) {
      next(error);
    }
  }
);

// Clear cart
router.delete('/', authenticateConsumer, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await CartController.clearCart(req, res);
    next();
  } catch (error) {
    next(error);
  }
});

// Checkout cart
router.post(
  '/checkout',
  authenticateConsumer,
  validateRequest(checkoutCartSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await CartController.checkout(req, res);
      next();
    } catch (error) {
      next(error);
    }
  }
);

export { router as cartRouter }; 