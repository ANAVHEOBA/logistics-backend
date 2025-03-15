import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { StoreCrud } from '../store/store.crud';

export const consumerOrderSchema = Joi.object({
  storeId: Joi.string().required(),
  zoneId: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      variantData: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          value: Joi.string().required()
        })
      )
    })
  ).min(1).required(),
  deliveryAddress: Joi.object({
    type: Joi.string().valid('manual').required(),
    manualAddress: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      postalCode: Joi.string().required(),
      recipientName: Joi.string().required(),
      recipientPhone: Joi.string().required(),
      recipientEmail: Joi.string().email().required()
    }).required()
  }).required(),
  packageSize: Joi.string().valid('SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE').required(),
  isFragile: Joi.boolean().default(false),
  isExpressDelivery: Joi.boolean().default(false),
  requiresSpecialHandling: Joi.boolean().default(false),
  specialInstructions: Joi.string(),
  paymentMethod: Joi.string().valid('BANK_TRANSFER', 'CASH', 'OTHER').required()
});

// Updated validation middleware for consumer orders
export const validateConsumerOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // First validate the request body
    await consumerOrderSchema.validateAsync(req.body);

    // Get store details and add pickup address
    const storeCrud = new StoreCrud();
    const store = await storeCrud.findById(req.body.storeId);
    
    if (!store) {
      res.status(404).json({
        success: false,
        message: 'Store not found'
      });
      return;
    }

    // Add the store's address as pickup address to the request
    req.body.pickupAddress = {
      street: store.address.street,
      city: store.address.city,
      state: store.address.state,
      country: store.address.country,
      postalCode: store.address.postalCode,
      recipientName: store.storeName,
      recipientPhone: store.contactInfo.phone,
      recipientEmail: store.contactInfo.email
    };

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
};

// Add validation for order status updates
export const orderStatusUpdateSchema = Joi.object({
  status: Joi.string()
    .valid('PENDING', 'CONFIRMED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED', 'FAILED_DELIVERY')
    .required(),
  notes: Joi.string().max(500)
});

export const validateOrderStatusUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await orderStatusUpdateSchema.validateAsync(req.body, { 
      abortEarly: false,
      stripUnknown: true 
    });
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: 'Invalid status update data',
        errors: error.message
      });
    }
  }
}; 