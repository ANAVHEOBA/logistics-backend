import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { OrderItemStatus } from './orderItem.model';

const orderItemStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(OrderItemStatus))
    .required()
});

export const validateOrderItemStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await orderItemStatusSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid status',
      errors: error instanceof Error ? error.message : 'Validation error'
    });
  }
}; 