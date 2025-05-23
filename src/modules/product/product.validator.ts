import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const productImageSchema = Joi.object({
  url: Joi.string().uri().required(),
  publicId: Joi.string().required()
});

const createProductSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10).max(1000),
  price: Joi.number().required().min(0),
  category: Joi.string().required(),
  stock: Joi.number().integer().min(0).required(),
  specifications: Joi.object().pattern(
    Joi.string(),
    Joi.string()
  ),
  variants: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      options: Joi.array().items(Joi.string()).min(1).required(),
      prices: Joi.array().items(Joi.number().min(0))
    })
  ),
  isPublished: Joi.boolean(),
  guestOrderEnabled: Joi.boolean(),
  minOrderQuantity: Joi.number().integer().min(1),
  maxOrderQuantity: Joi.number().integer().min(1),
  shippingInfo: Joi.object({
    weight: Joi.number().min(0),
    dimensions: Joi.object({
      length: Joi.number().min(0),
      width: Joi.number().min(0),
      height: Joi.number().min(0)
    }),
    requiresSpecialHandling: Joi.boolean()
  })
}).unknown(true);

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(10).max(1000),
  price: Joi.number().min(0),
  category: Joi.string(),
  images: Joi.array().items(productImageSchema),
  stock: Joi.number().integer().min(0),
  specifications: Joi.object().pattern(
    Joi.string(),
    Joi.string()
  ),
  variants: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      options: Joi.array().items(Joi.string()).min(1).required(),
      prices: Joi.array().items(Joi.number().min(0))
    })
  ),
  isPublished: Joi.boolean()
});

export const validateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check if files exist
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
      return;
    }

    const schema = req.method === 'POST' ? createProductSchema : updateProductSchema;
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: 'Invalid product data',
        errors: error.message
      });
    }
  }
};