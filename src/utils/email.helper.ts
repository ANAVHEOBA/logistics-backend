import nodemailer from 'nodemailer';
import { config } from '../config/environment';
import { sendEmail } from '../services/email.service';

// Create reusable transporter object using Gmail
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.auth.user,
    pass: config.email.auth.pass
  },
  pool: true,
  maxConnections: 1,
  maxMessages: 3,
  debug: true,
  logger: true,
  tls: {
    rejectUnauthorized: true
  }
});

const emailTemplate = (content: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GoFromA2Z Africa</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
      <div style="background-color: #000000; color: #FFD700; padding: 20px; text-align: center; border-radius: 5px; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px;">GoFromA2Z Africa</h1>
      </div>
      <div style="padding: 30px; background-color: #ffffff; border: 1px solid #FFD700; border-radius: 5px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        ${content}
      </div>
      <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
        <p>This is an automated message, please do not reply directly to this email.</p>
        <p style="margin: 5px 0;">© ${new Date().getFullYear()} GoFromA2Z Africa. All rights reserved.</p>
        <p style="margin: 5px 0;">Contact us: <a href="mailto:${config.email.auth.user}" style="color: #FFD700;">${config.email.auth.user}</a></p>
      </div>
    </div>
  </body>
  </html>
`;

export const sendVerificationEmail = async (
  email: string,
  otp: string,
  firstName: string
): Promise<void> => {
  const subject = '🔐 Verify Your Email - GoFromA2Z Africa';
  const content = `
    <h2 style="color: #333; margin-top: 0;">Email Verification</h2>
    <p style="color: #555;">Hello ${firstName},</p>
    <p style="color: #555;">Your verification code is: <strong style="background-color: #000000; color: #FFD700; padding: 5px 10px; border-radius: 3px; font-family: monospace;">${otp}</strong></p>
    <p style="color: #555;">This code will expire in 10 minutes.</p>
  `;
  
  await sendEmail(email, subject, emailTemplate(content));
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  firstName: string
): Promise<void> => {
  const subject = '🔑 Password Reset Request - GoFromA2Z Africa';
  const content = `
    <h2 style="color: #333; margin-top: 0;">Password Reset</h2>
    <p style="color: #555;">Hello ${firstName},</p>
    <p style="color: #555;">Your password reset code is: <strong style="background-color: #000000; color: #FFD700; padding: 5px 10px; border-radius: 3px; font-family: monospace;">${token}</strong></p>
    <p style="color: #555;">This code will expire in 10 minutes.</p>
    <p style="color: #555;">If you didn't request this, please ignore this email.</p>
  `;
  
  await sendEmail(email, subject, emailTemplate(content));
};

// Verify transporter connection
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});
