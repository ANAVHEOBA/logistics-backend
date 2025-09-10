// user/google.auth.handler.ts
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { config } from '../../config/environment';
import { UserCrud } from './user.crud';

const client = new OAuth2Client(config.googleClientId);

const userCrud = new UserCrud();

export const googleSignIn = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleClientId,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      res.status(400).json({ success: false, message: 'Invalid Google token' });
      return;
    }

    const { email, name, sub: googleId } = payload;

    let user = await userCrud.findByEmail(email);

    if (!user) {
      // Create new user
      user = await userCrud.createUser({
        email,
        name: name || 'Google User', 
        phone: '', // optional
        password: '', // no password for Google users
        verificationCode: '',
        verificationCodeExpiry: new Date(),
        isEmailVerified: true,
        status: 'active',
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      data: {
        token: jwtToken,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          isEmailVerified: user.isEmailVerified,
        },
      },
    });
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    res.status(500).json({ success: false, message: 'Google authentication failed' });
  }
};