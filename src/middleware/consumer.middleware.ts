import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import mongoose from 'mongoose';

interface ConsumerJwtPayload {
  consumerId: string;
  email: string;
  type: 'consumer';
}

declare global {
  namespace Express {
    interface Request {
      consumer?: {
        consumerId: string;
        email: string;
        type: 'consumer';
        _id: mongoose.Types.ObjectId;
      };
    }
  }
}

export const authenticateConsumer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ 
        success: false,
        message: 'Authorization header must start with Bearer' 
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ 
        success: false,
        message: 'No token, authorization denied' 
      });
      return;
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as ConsumerJwtPayload;

      if (decoded.type !== 'consumer') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Consumer access required.'
        });
        return;
      }

      req.consumer = {
        consumerId: decoded.consumerId,
        email: decoded.email,
        type: decoded.type,
        _id: new mongoose.Types.ObjectId(decoded.consumerId)
      };

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ 
          success: false,
          message: 'Token has expired' 
        });
        return;
      }

      res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
  } catch (error) {
    console.error('Consumer Auth Middleware Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
}; 