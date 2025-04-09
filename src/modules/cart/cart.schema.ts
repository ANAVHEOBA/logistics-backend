import { z } from 'zod';

export const cartItemSchema = z.object({
  productId: z.string(),
  storeId: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  name: z.string(),
  variantData: z.array(z.object({
    name: z.string(),
    value: z.string(),
    price: z.number()
  })).optional()
});

export const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  variantData: z.array(z.object({
    name: z.string(),
    value: z.string()
  })).optional()
});

export const updateCartItemSchema = z.object({
  quantity: z.number().min(1)
});

export const createCartSchema = z.object({
  userId: z.string().optional(),
  items: z.array(cartItemSchema).optional(),
  expiresAt: z.date().optional()
}); 