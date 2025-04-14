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

export const checkoutCartSchema = z.object({
  deliveryAddress: z.object({
    type: z.enum(['saved', 'manual']),
    savedAddress: z.string().optional(),
    manualAddress: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      postalCode: z.string(),
      recipientName: z.string(),
      recipientPhone: z.string(),
      recipientEmail: z.string().optional()
    }).optional()
  }),
  packageSize: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE']),
  isFragile: z.boolean().optional(),
  isExpressDelivery: z.boolean().optional(),
  requiresSpecialHandling: z.boolean().optional(),
  specialInstructions: z.string().optional(),
  zoneId: z.string(),
  paymentMethod: z.enum(['BANK_TRANSFER', 'CASH', 'OTHER'])
});

export const createCartSchema = z.object({
  userId: z.string().optional(),
  items: z.array(cartItemSchema).optional(),
  expiresAt: z.date().optional()
}); 