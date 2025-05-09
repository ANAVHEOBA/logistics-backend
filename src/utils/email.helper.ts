import nodemailer from 'nodemailer';
import { config } from '../config/environment';
import { sendEmail } from '../services/email.service';

// Create reusable transporter object using Gmail
const transporter = nodemailer.createTransport({
  host: 'gofroma2zafrica.com',
  port: 587,
  secure: false,
  auth: {
    user: config.email.auth.user,
    pass: config.email.auth.pass
  },
  debug: true,
  logger: true
});

export const sendVerificationEmail = async (
  email: string,
  otp: string,
  firstName: string
): Promise<void> => {
  const subject = 'Verify Your Email';
  const html = `
    <h1>Hello ${firstName},</h1>
    <p>Your verification code is: <strong>${otp}</strong></p>
    <p>This code will expire in 10 minutes.</p>
  `;
  
  await sendEmail(email, subject, html);
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  firstName: string
): Promise<void> => {
  const subject = 'Password Reset Request';
  const html = `
    <h1>Hello ${firstName},</h1>
    <p>Your password reset code is: <strong>${token}</strong></p>
    <p>This code will expire in 10 minutes.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;
  
  await sendEmail(email, subject, html);
};

// Verify transporter connection
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});
