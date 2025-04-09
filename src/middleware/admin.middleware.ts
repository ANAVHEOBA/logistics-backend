import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import mongoose from 'mongoose';

interface AdminJwtPayload {
  adminId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: {
        adminId: string;
        email: string;
        role: string;
        _id: mongoose.Types.ObjectId;
      };
    }
  }
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    const decoded = jwt.verify(token, config.jwtSecret) as AdminJwtPayload;
    if (!decoded || decoded.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
      return;
    }

    req.admin = {
      adminId: decoded.adminId,
      email: decoded.email,
      role: decoded.role,
      _id: new mongoose.Types.ObjectId(decoded.adminId)
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
};