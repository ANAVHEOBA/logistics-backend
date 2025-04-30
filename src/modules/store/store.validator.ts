import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { StoreCategory } from './store.model';

const storeSchema = Joi.object({
  storeName: Joi.string()
    .required()
    .min(3)
    .max(50)
    .trim()
    .pattern(/^[a-zA-Z0-9-_\s]+$/)
    .messages({
      'string.pattern.base': 'Store name can only contain letters, numbers, spaces, hyphens and underscores'
    }),

  description: Joi.string()
    .required()
    .min(20)
    .max(1000),

  category: Joi.string()
    .required()
    .valid(...Object.values(StoreCategory)),

  contactInfo: Joi.object({
    email: Joi.string()
      .required()
      .email(),
    phone: Joi.string()
      .required()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .messages({
        'string.pattern.base': 'Please provide a valid phone number'
      }),
    whatsapp: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional()
  }),

  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required()
  }),

  branding: Joi.object({
    logo: Joi.string().uri().optional(),
    banner: Joi.string().uri().optional(),
    colors: Joi.object({
      primary: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
      secondary: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    }).optional()
  }).optional(),

  socialLinks: Joi.object({
    instagram: Joi.string().uri().optional(),
    facebook: Joi.string().uri().optional(),
    twitter: Joi.string().uri().optional()
  }).optional(),

  businessInfo: Joi.object({
    registrationNumber: Joi.string().optional(),
    taxId: Joi.string().optional()
  }).optional()
});

const storeSetupSchema = Joi.object({
  storeName: Joi.string()
    .required()
    .min(3)
    .max(50)
    .trim()
    .pattern(/^[a-zA-Z0-9-_\s]+$/),
  
  description: Joi.string()
    .required()
    .min(20)
    .max(1000),
  
  category: Joi.string()
    .required()
    .valid(...Object.values(StoreCategory)),
  
  contactInfo: Joi.object({
    email: Joi.string()
      .required()
      .email(),
    phone: Joi.string()
      .required()
      .pattern(/^\+?[1-9]\d{1,14}$/),
    whatsapp: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional()
  }),
  
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required()
  }),
  
  businessInfo: Joi.object({
    registrationNumber: Joi.string().optional(),
    taxId: Joi.string().optional()
  }).optional()
});

export const validateStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await storeSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.message
      });
    }
  }
};

export const validateStoreSetup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await storeSetupSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.message
      });
    }
  }
}; 