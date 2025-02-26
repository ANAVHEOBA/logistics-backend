import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const consumerRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required()
});

const profileUpdateSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string()
});

const passwordResetSchema = Joi.object({
  password: Joi.string().min(6).required()
});

export const validateConsumerRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await consumerRegistrationSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const validateProfileUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await profileUpdateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const validatePasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await passwordResetSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}; 