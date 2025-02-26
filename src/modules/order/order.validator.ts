import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const consumerOrderSchema = Joi.object({
  storeId: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
      variantData: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          value: Joi.string().required()
        })
      )
    })
  ).min(1).required(),
  deliveryAddress: Joi.object({
    type: Joi.string().valid('saved', 'manual').required(),
    savedAddress: Joi.when('type', {
      is: 'saved',
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),
    manualAddress: Joi.when('type', {
      is: 'manual',
      then: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        postalCode: Joi.string().required(),
        recipientName: Joi.string().required(),
        recipientPhone: Joi.string().required()
      }).required(),
      otherwise: Joi.forbidden()
    })
  }).required(),
  isExpressDelivery: Joi.boolean().default(false),
  specialInstructions: Joi.string().max(500).allow('', null)
});

// Validation middleware for consumer orders
export const validateConsumerOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await consumerOrderSchema.validateAsync(req.body, { 
      abortEarly: false,
      stripUnknown: true 
    });
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: 'Invalid order data',
        errors: error.message
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