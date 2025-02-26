import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ConsumerCrud } from './consumer.crud';
import { generateOTP, getOTPExpiry } from '../../utils/otp.helper';
import { sendVerificationEmail, sendPasswordResetEmail } from '../../utils/email.helper';
import { IConsumerRegistration } from './consumer.model';
import jwt from 'jsonwebtoken';
import { config } from '../../config/environment';
import { Rating } from '../rating/rating.schema';
import { Store } from '../store/store.model';
import { ConsumerSchema } from './consumer.schema';

export class ConsumerController {
  private consumerCrud: ConsumerCrud;

  constructor() {
    this.consumerCrud = new ConsumerCrud();
  }

  register = async (
    req: Request<{}, {}, IConsumerRegistration>,
    res: Response
  ): Promise<void> => {
    try {
      const { email, password, firstName, lastName, phone } = req.body;

      // Check if consumer already exists
      const existingConsumer = await this.consumerCrud.findByEmail(email);
      if (existingConsumer) {
        res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
        return;
      }

      // Generate OTP and hash password
      const otp = generateOTP();
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create consumer
      const consumer = await this.consumerCrud.createConsumer({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        verificationCode: otp,
        verificationCodeExpiry: getOTPExpiry(),
        isEmailVerified: false,
        status: 'inactive'
      });

      // Send verification email
      await sendVerificationEmail(email, otp, firstName);

      res.status(201).json({
        success: true,
        message: 'Registration successful. Please check your email for verification code.',
        consumerId: consumer._id
      });
    } catch (error) {
      console.error('Consumer registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed'
      });
    }
  };

  verifyEmail = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { consumerId, otp } = req.body;

      const consumer = await this.consumerCrud.findById(consumerId);
      if (!consumer) {
        res.status(404).json({
          success: false,
          message: 'Consumer not found'
        });
        return;
      }

      if (consumer.isEmailVerified) {
        res.status(400).json({
          success: false,
          message: 'Email already verified'
        });
        return;
      }

      if (consumer.verificationCode !== otp) {
        res.status(400).json({
          success: false,
          message: 'Invalid verification code'
        });
        return;
      }

      if (new Date() > consumer.verificationCodeExpiry) {
        res.status(400).json({
          success: false,
          message: 'Verification code expired'
        });
        return;
      }

      const verifiedConsumer = await this.consumerCrud.verifyEmail(consumerId);

      res.status(200).json({
        success: true,
        message: 'Email verified successfully'
      });
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Email verification failed'
      });
    }
  };

  login = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Find consumer by email
      const consumer = await this.consumerCrud.findByEmail(email);
      if (!consumer) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
        return;
      }

      // Check if email is verified
      if (!consumer.isEmailVerified) {
        res.status(401).json({
          success: false,
          message: 'Please verify your email first'
        });
        return;
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, consumer.password);
      if (!isValidPassword) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
        return;
      }

      // Update last login
      await this.consumerCrud.updateLastLogin(consumer._id.toString());

      // Generate JWT token
      const token = jwt.sign(
        { 
          consumerId: consumer._id,
          email: consumer.email,
          type: 'consumer'  // To distinguish from store owners
        },
        config.jwtSecret,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        success: true,
        data: {
          token,
          consumer: {
            _id: consumer._id,
            email: consumer.email,
            firstName: consumer.firstName,
            lastName: consumer.lastName,
            isEmailVerified: consumer.isEmailVerified
          }
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed'
      });
    }
  };

  rateStore = async (req: Request, res: Response): Promise<void> => {
    try {
      const consumerId = req.consumer?.consumerId;
      if (!consumerId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const { storeId, rating, review } = req.body;

      // Validate rating
      if (rating < 1 || rating > 5) {
        res.status(400).json({
          success: false,
          message: 'Rating must be between 1 and 5'
        });
        return;
      }

      // Check if store exists and allows ratings
      const store = await Store.findById(storeId);
      if (!store) {
        res.status(404).json({
          success: false,
          message: 'Store not found'
        });
        return;
      }

      if (!store.settings.allowRatings) {
        res.status(400).json({
          success: false,
          message: 'This store does not accept ratings'
        });
        return;
      }

      // Create or update rating
      const ratingDoc = await Rating.findOneAndUpdate(
        { storeId, consumerId },
        { rating, review },
        { upsert: true, new: true }
      );

      // Update store metrics
      const ratings = await Rating.find({ storeId });
      const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
      
      await Store.findByIdAndUpdate(storeId, {
        $set: { 'metrics.averageRating': averageRating }
      });

      res.status(200).json({
        success: true,
        data: ratingDoc
      });
    } catch (error) {
      console.error('Rate store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to rate store'
      });
    }
  };

  getStoreRatings = async (req: Request, res: Response): Promise<void> => {
    try {
      const { storeId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      const ratings = await Rating.find({ storeId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('consumerId', 'firstName lastName');

      const total = await Rating.countDocuments({ storeId });

      res.status(200).json({
        success: true,
        data: {
          ratings,
          pagination: {
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit))
          }
        }
      });
    } catch (error) {
      console.error('Get ratings error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get ratings'
      });
    }
  };

  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const consumerId = req.consumer?.consumerId;
      if (!consumerId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const consumer = await this.consumerCrud.findById(consumerId);
      if (!consumer) {
        res.status(404).json({
          success: false,
          message: 'Consumer not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          _id: consumer._id,
          email: consumer.email,
          firstName: consumer.firstName,
          lastName: consumer.lastName,
          phone: consumer.phone,
          preferences: consumer.preferences
        }
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get profile'
      });
    }
  };

  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const consumerId = req.consumer?.consumerId;
      if (!consumerId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const updatedConsumer = await this.consumerCrud.updateProfile(
        consumerId,
        req.body
      );

      if (!updatedConsumer) {
        res.status(404).json({
          success: false,
          message: 'Consumer not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          _id: updatedConsumer._id,
          email: updatedConsumer.email,
          firstName: updatedConsumer.firstName,
          lastName: updatedConsumer.lastName,
          phone: updatedConsumer.phone
        }
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update profile'
      });
    }
  };

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const consumer = await this.consumerCrud.findByEmail(email);

      if (!consumer) {
        res.status(404).json({
          success: false,
          message: 'Consumer not found'
        });
        return;
      }

      const resetToken = generateOTP();
      const resetExpiry = getOTPExpiry();

      await this.consumerCrud.setPasswordResetToken(
        email,
        resetToken,
        resetExpiry
      );

      await sendPasswordResetEmail(email, resetToken, consumer.firstName);

      res.status(200).json({
        success: true,
        message: 'Password reset instructions sent to email'
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process forgot password request'
      });
    }
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, password } = req.body;
      const consumer = await ConsumerSchema.findOne({
        passwordResetToken: token,
        passwordResetExpiry: { $gt: new Date() }
      });

      if (!consumer) {
        res.status(400).json({
          success: false,
          message: 'Invalid or expired reset token'
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.consumerCrud.updatePassword(consumer._id.toString(), hashedPassword);

      res.status(200).json({
        success: true,
        message: 'Password reset successful'
      });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to reset password'
      });
    }
  };

  addFavoriteStore = async (req: Request, res: Response): Promise<void> => {
    try {
      const consumerId = req.consumer?.consumerId;
      const { storeId } = req.params;

      if (!consumerId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const updatedConsumer = await this.consumerCrud.addFavoriteStore(
        consumerId,
        storeId
      );

      res.status(200).json({
        success: true,
        data: updatedConsumer?.preferences.favoriteStores
      });
    } catch (error) {
      console.error('Add favorite store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to add favorite store'
      });
    }
  };

  removeFavoriteStore = async (req: Request, res: Response): Promise<void> => {
    try {
      const consumerId = req.consumer?.consumerId;
      const { storeId } = req.params;

      if (!consumerId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const updatedConsumer = await this.consumerCrud.removeFavoriteStore(
        consumerId,
        storeId
      );

      res.status(200).json({
        success: true,
        data: updatedConsumer?.preferences.favoriteStores
      });
    } catch (error) {
      console.error('Remove favorite store error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to remove favorite store'
      });
    }
  };

  updatePreferredCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const consumerId = req.consumer?.consumerId;
      const { categories } = req.body;

      if (!consumerId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const updatedConsumer = await this.consumerCrud.updatePreferredCategories(
        consumerId,
        categories
      );

      res.status(200).json({
        success: true,
        data: updatedConsumer?.preferences.preferredCategories
      });
    } catch (error) {
      console.error('Update preferred categories error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update preferred categories'
      });
    }
  };
}