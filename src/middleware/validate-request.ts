import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest = (schema: AnyZodObject) => 
  (req: Request, res: Response, next: NextFunction) => {
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);
    
    schema.parseAsync(req.body)
    .then(() => next())
    .catch((error) => {
      console.log('Validation error:', error);
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Invalid request data'
        });
      }
    });
  }; 