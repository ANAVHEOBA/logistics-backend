import nodemailer from 'nodemailer';
import { config } from '../config/environment';
import { IOrder } from '../modules/order/order.model';
import { IUser } from '../modules/user/user.model';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',  // Use 'gmail' instead of custom SMTP settings
      auth: {
        user: config.email.user,
        pass: config.email.password
      },
      debug: true, // Enable debug logs
      logger: true // Enable logger
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('Email configuration error:', error);
      } else {
        console.log('Email service is ready');
      }
    });
  }

  async sendOrderStatusUpdate(user: IUser, order: IOrder): Promise<void> {
    const statusMessages: { [key: string]: string } = {
      CONFIRMED: 'Your order has been confirmed and is being processed.',
      PICKED_UP: 'Your order has been picked up and is on its way.',
      IN_TRANSIT: 'Your order is in transit to the delivery location.',
      DELIVERED: 'Your order has been successfully delivered.',
      CANCELLED: 'Your order has been cancelled.',
      FAILED_DELIVERY: 'Delivery attempt failed. Our team will contact you shortly.'
    };

    const message = statusMessages[order.status] || 'Your order status has been updated.';
    const additionalNotes = order.statusNotes ? `<p><strong>Additional Notes:</strong> ${order.statusNotes}</p>` : '';

    const mailOptions = {
      from: `Logistics System <${config.email.user}>`,
      to: user.email,
      subject: `Order Status Update - ${order.trackingNumber}`,
      html: `
        <h2>Order Status Update</h2>
        <p>Hello ${user.name},</p>
        <p>${message}</p>
        ${additionalNotes}
        <p><strong>Order Details:</strong></p>
        <ul>
          <li>Tracking Number: ${order.trackingNumber}</li>
          <li>Status: ${order.status}</li>
          <li>Estimated Delivery: ${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</li>
        </ul>
        <p>Track your order using your tracking number: ${order.trackingNumber}</p>
        <p>Thank you for using our service!</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  async sendOrderConfirmation(user: IUser, order: IOrder): Promise<void> {
    const mailOptions = {
      from: `Logistics System <${config.email.user}>`,
      to: user.email,
      subject: `Order Confirmation - ${order.trackingNumber}`,
      html: `
        <h2>Order Confirmation</h2>
        <p>Hello ${user.name},</p>
        <p>Your order has been successfully placed!</p>
        <p><strong>Order Details:</strong></p>
        <ul>
          <li>Tracking Number: ${order.trackingNumber}</li>
          <li>Package Size: ${order.packageSize}</li>
          <li>Price: ₦${order.price}</li>
          <li>Estimated Delivery: ${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</li>
        </ul>
        <p><strong>Delivery Address:</strong></p>
        <p>${this.formatAddress(order.deliveryAddress)}</p>
        <p>You can track your order using your tracking number: ${order.trackingNumber}</p>
        <p>Thank you for choosing our service!</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  private formatAddress(address: any): string {
    if (typeof address === 'string') {
      return 'Saved address will be used for delivery';
    }
    
    const manualAddress = address.manualAddress;
    return `
      ${manualAddress.street},
      ${manualAddress.city},
      ${manualAddress.state},
      ${manualAddress.country},
      ${manualAddress.postalCode}
      <br>
      Recipient: ${manualAddress.recipientName}
      <br>
      Phone: ${manualAddress.recipientPhone}
    `;
  }
} 