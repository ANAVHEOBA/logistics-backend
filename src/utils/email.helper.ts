import nodemailer from 'nodemailer';
import { config } from '../config/environment';

// Create reusable transporter object using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.password
  },
  debug: true,
  logger: true
});

export const sendVerificationEmail = async (
  email: string,
  otp: string,
  name: string
): Promise<void> => {
  try {
    const mailOptions = {
      from: `"Logistics System" <${config.email.user}>`,
      to: email,
      subject: 'Email Verification - Logistics System',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hello ${name},</h2>
          <p>Thank you for registering with our Logistics System.</p>
          <p>Your verification code is: <strong style="font-size: 20px;">${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
        </div>
      `
    };

    // Add error logging
    console.log('Attempting to send email to:', email);
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send verification email');
  }
};

// Verify transporter connection
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});