// user/google.auth.handler.ts
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { config } from '../../config/environment';
import { UserCrud } from './user.crud';
import mongoose from 'mongoose';

const client = new OAuth2Client(config.googleClientId);
const userCrud = new UserCrud();

/* ------------------------------------------------------------------ */
/* helper – never crash the handler                                   */
/* ------------------------------------------------------------------ */
const safeLog = (level: 'info' | 'error', ...args: any[]) => {
  try {
    if (level === 'error') console.error('[GoogleAuth]', ...args);
    else console.log('[GoogleAuth]', ...args);
  } catch {
    /* ignore console faults */
  }
};

export const googleSignIn = async (req: Request, res: Response): Promise<void> => {
  safeLog('info', 'Incoming /auth/google call, body keys:', Object.keys(req.body));

  const { token } = req.body;
  if (!token || typeof token !== 'string') {
    safeLog('error', 'Missing or malformed token in request body');
    res.status(400).json({ success: false, message: 'Token required' });
    return;
  }

  try {
    /* ---------- 1. Verify Google token ---------- */
    safeLog('info', 'Verifying Google token…');
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleClientId,
    });

    const payload = ticket.getPayload();
    safeLog('info', 'Google payload:', { email: payload?.email, sub: payload?.sub });
    if (!payload || !payload.email) {
      safeLog('error', 'Google payload missing email');
      res.status(400).json({ success: false, message: 'Invalid Google token' });
      return;
    }

    const { email, name, sub: googleId } = payload;

    /* ---------- 2. Check / Create user ---------- */
    let user = await userCrud.findByEmail(email);
    safeLog('info', 'User lookup result:', user ? 'found' : 'not found');

    if (!user) {
      safeLog('info', 'Creating new user for email:', email);
      try {
        user = await userCrud.createUser({
          email,
          name: name || 'Google User',
          phone: '',
          password: '',
          verificationCode: '',
          verificationCodeExpiry: new Date(),
          isEmailVerified: true,
          status: 'active',
          loginMethod: 'google', // <-- still here
        } as any); // <-- cast to shut TS up
        safeLog('info', 'User created with _id:', user._id);
      } catch (createErr: any) {
        /* ---- duplicate key race-condition ---- */
        if (createErr.code === 11000) {
          safeLog('info', 'Race condition: user already exists, refetching…');
          user = await userCrud.findByEmail(email);
          if (!user) {
            safeLog('error', 'Still no user after duplicate key error');
            res.status(500).json({ success: false, message: 'User creation conflict' });
            return;
          }
        } else {
          safeLog('error', 'User creation threw:', createErr);
          throw createErr; // let outer catch deal with it
        }
      }
    }

    if (!user || !user._id) {
      safeLog('error', 'User object or _id is missing after find/create');
      res.status(500).json({ success: false, message: 'User data corrupt' });
      return;
    }

    /* ---------- 3. Issue JWT ---------- */
    if (!config.jwtSecret) {
      safeLog('error', 'JWT_SECRET is not defined in environment');
      res.status(500).json({ success: false, message: 'Server mis-configured' });
      return;
    }

    const jwtPayload = { userId: user._id.toString(), email: user.email };
    safeLog('info', 'Signing JWT for payload:', jwtPayload);
    const jwtToken = jwt.sign(jwtPayload, config.jwtSecret, { expiresIn: '24h' });

    /* ---------- 4. Respond ---------- */
    res.status(200).json({
      success: true,
      data: {
        token: jwtToken,
        user: {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          isEmailVerified: user.isEmailVerified,
        },
      },
    });
    safeLog('info', 'Login successful for:', user.email);
  } catch (error: any) {
    /* ---------- 5. Global catch – full stack ---------- */
    safeLog('error', 'Uncaught exception in googleSignIn:', error);
    safeLog('error', 'Stack:', error.stack);
    res.status(500).json({ success: false, message: 'Google authentication failed' });
  }
};