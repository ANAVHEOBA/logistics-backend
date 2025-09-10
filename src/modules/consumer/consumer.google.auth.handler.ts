import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { config } from '../../config/environment';
import { ConsumerCrud } from './consumer.crud';
import mongoose from 'mongoose';

const client = new OAuth2Client(config.googleClientId);
const consumerCrud = new ConsumerCrud();

const safeLog = (level: 'info' | 'error', ...args: any[]) => {
  try {
    if (level === 'error') console.error('[ConsumerGoogleAuth]', ...args);
    else console.log('[ConsumerGoogleAuth]', ...args);
  } catch {}
};

export const consumerGoogleSignIn = async (req: Request, res: Response): Promise<void> => {
  safeLog('info', 'Incoming /consumers/auth/google call, body keys:', Object.keys(req.body));

  const { token } = req.body;
  if (!token || typeof token !== 'string') {
    res.status(400).json({ success: false, message: 'Token required' });
    return;
  }

  try {
    /* 1. verify Google token */
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleClientId,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) {
      res.status(400).json({ success: false, message: 'Invalid Google token' });
      return;
    }
    const { email, name, sub: googleId } = payload;

    /* 2. find or create consumer */
    let consumer = await consumerCrud.findByEmail(email);
    if (!consumer) {
      consumer = await consumerCrud.createConsumer({
        email,
        firstName: name?.split(' ')[0] || 'Google',
        lastName: name?.split(' ')[1] || 'User',
        phone: '',
        password: '',
        verificationCode: '',
        verificationCodeExpiry: new Date(),
        isEmailVerified: true,
        status: 'active',
        loginMethod: 'google',
        googleId,
        picture: payload.picture,
      });
    }

    if (!consumer) throw new Error('Consumer creation failed');

    /* 3. issue JWT */
    if (!config.jwtSecret) throw new Error('JWT_SECRET missing');
    const jwtToken = jwt.sign(
      { userId: consumer._id.toString(), email: consumer.email },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    /* 4. respond (same shape as user endpoint) */
    res.status(200).json({
      success: true,
      data: {
        token: jwtToken,
        user: {
          _id: consumer._id.toString(),
          email: consumer.email,
          firstName: consumer.firstName,
          lastName: consumer.lastName,
          isEmailVerified: consumer.isEmailVerified,
        },
      },
    });
    safeLog('info', 'Consumer Google login successful:', consumer.email);
  } catch (err: any) {
    safeLog('error', 'Uncaught exception:', err);
    res.status(500).json({ success: false, message: 'Google authentication failed' });
  }
};