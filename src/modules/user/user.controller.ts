import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { UserCrud } from './user.crud';
import { generateOTP, getOTPExpiry } from '../../utils/otp.helper';
import { sendVerificationEmail, sendPasswordResetEmail } from '../../utils/email.helper';
import { IUserRegistration, IVerifyEmail, ILoginRequest } from './user.model';
import jwt from 'jsonwebtoken';
import { config } from '../../config/environment';
import { UserSchema } from './user.schema';

export class UserController {
  private userCrud: UserCrud;

  constructor() {
    this.userCrud = new UserCrud();
  }

  register = async (
    req: Request<{}, {}, IUserRegistration>,
    res: Response
  ): Promise<void> => {
    try {
      const { email, password, name, phone } = req.body;

      // Check if user already exists
      const existingUser = await this.userCrud.findByEmail(email);
      
      if (existingUser) {
        // If user exists and is verified, reject registration
        if (existingUser.isEmailVerified) {
          res.status(400).json({
            success: false,
            message: 'Email already registered'
          });
          return;
        }

        // If user exists but not verified, check verification code status
        const now = new Date();
        if (now <= existingUser.verificationCodeExpiry) {
          // Verification code is still valid
          res.status(400).json({
            success: false,
            message: 'Please verify your email with the code already sent',
            userId: existingUser._id
          });
          return;
        }

        // Verification code has expired, generate new one
        const otp = generateOTP();
        const updatedUser = await this.userCrud.updateUser(existingUser._id.toString(), {
          verificationCode: otp,
          verificationCodeExpiry: getOTPExpiry()
        });

        // Send new verification email
        await sendVerificationEmail(email, otp, name);

        res.status(200).json({
          success: true,
          message: 'New verification code has been sent to your email',
          userId: existingUser._id
        });
        return;
      }

      // If user doesn't exist, proceed with new registration
      const otp = generateOTP();
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await this.userCrud.createUser({
        email,
        password: hashedPassword,
        name,
        phone,
        verificationCode: otp,
        verificationCodeExpiry: getOTPExpiry()
      });

      // Send verification email
      await sendVerificationEmail(email, otp, name);

      res.status(201).json({
        success: true,
        message: 'Registration successful. Please check your email for verification code.',
        userId: user._id
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed'
      });
    }
  };

  verifyEmail = async (
    req: Request<{}, {}, IVerifyEmail>,
    res: Response
  ): Promise<void> => {
    try {
      const { userId, otp } = req.body;

      const user = await this.userCrud.findById(userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      // Check if OTP is valid and not expired
      if (user.verificationCode !== otp) {
        res.status(400).json({
          success: false,
          message: 'Invalid verification code'
        });
        return;
      }

      if (new Date() > user.verificationCodeExpiry) {
        res.status(400).json({
          success: false,
          message: 'Verification code has expired'
        });
        return;
      }

      // Verify user
      await this.userCrud.verifyEmail(userId);

      res.status(200).json({
        success: true,
        message: 'Email verified successfully'
      });
    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Verification failed'
      });
    }
  };

  login = async (
    req: Request<{}, {}, ILoginRequest>,
    res: Response
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await this.userCrud.findByEmail(email);
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
        return;
      }

      // Check if email is verified
      if (!user.isEmailVerified) {
        res.status(401).json({
          success: false,
          message: 'Please verify your email first'
        });
        return;
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
        return;
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        config.jwtSecret,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        success: true,
        data: {
          token,
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            isEmailVerified: user.isEmailVerified
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

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const user = await this.userCrud.findByEmail(email);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      const resetToken = generateOTP();
      const resetExpiry = getOTPExpiry();

      await this.userCrud.setPasswordResetToken(
        email,
        resetToken,
        resetExpiry
      );

      await sendPasswordResetEmail(email, resetToken, user.name, 'merchant');

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
      const user = await UserSchema.findOne({
        passwordResetToken: token,
        passwordResetExpiry: { $gt: new Date() }
      });

      if (!user) {
        res.status(400).json({
          success: false,
          message: 'Invalid or expired reset token'
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userCrud.updatePassword(user._id.toString(), hashedPassword);

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
}