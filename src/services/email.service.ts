import nodemailer from 'nodemailer';
import { config } from '../config/environment';
import { IOrder } from '../modules/order/order.model';
import { IUser } from '../modules/user/user.model';
import { IOrderItemResponse } from '../modules/orderItem/orderItem.model';

interface IEmailRecipient {
  email: string;
  name: string;
}

export class EmailService {
  private static transporter: nodemailer.Transporter;

  constructor() {
    if (!EmailService.transporter) {
      EmailService.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.email.auth.user,
          pass: config.email.auth.pass
        },
        debug: true,
        logger: true
      });

      // Verify connection configuration
      EmailService.transporter.verify((error, success) => {
        if (error) {
          console.error('Email configuration error:', error);
        } else {
          console.log('Email service is ready');
        }
      });
    }
  }

  // Add generic send email method
  static async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: `${config.email.auth.user}`,
      to,
      subject,
      html
    };

    try {
      await EmailService.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
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
      from: `Logistics System <${config.email.auth.user}>`,
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
      await EmailService.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  async sendOrderConfirmation(user: IUser, order: IOrder): Promise<void> {
    const mailOptions = {
      from: `Logistics System <${config.email.auth.user}>`,
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
      await EmailService.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  private formatAddress(address: any): string {
    if (typeof address === 'string') {
      return 'Saved address will be used for delivery';
    }
    
    return `
      ${address.street},
      ${address.city},
      ${address.state},
      ${address.country},
      ${address.postalCode}
      <br>
      Recipient: ${address.recipientName}
      <br>
      Phone: ${address.recipientPhone}
    `;
  }

  async sendStoreOrderNotification(
    storeEmail: string, 
    order: IOrder, 
    items: IOrderItemResponse[]
  ): Promise<void> {
    const mailOptions = {
      from: `Logistics System <${config.email.auth.user}>`,
      to: storeEmail,
      subject: `New Order Received - ${order.trackingNumber}`,
      html: `
        <h2>New Order Received</h2>
        <p>You have received a new order!</p>
        <p><strong>Order Details:</strong></p>
        <ul>
          <li>Order ID: ${order._id}</li>
          <li>Tracking Number: ${order.trackingNumber}</li>
          <li>Status: ${order.status}</li>
        </ul>
        <p><strong>Items:</strong></p>
        <ul>
          ${items.map(item => `
            <li>
              Product ID: ${item.productId}<br>
              Quantity: ${item.quantity}<br>
              Price: ₦${item.price}
            </li>
          `).join('')}
        </ul>
        <p>Please prepare these items for pickup.</p>
      `
    };

    try {
      await EmailService.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send store notification:', error);
      throw error;
    }
  }

  async sendDeliveryConfirmation(user: IUser, order: IOrder): Promise<void> {
    const mailOptions = {
      from: `Logistics System <${config.email.auth.user}>`,
      to: user.email,
      subject: `Delivery Confirmation - ${order.trackingNumber}`,
      html: `
        <h2>Delivery Confirmation</h2>
        <p>Hello ${user.name},</p>
        <p>Your order has been successfully delivered!</p>
        <p><strong>Order Details:</strong></p>
        <ul>
          <li>Tracking Number: ${order.trackingNumber}</li>
          <li>Delivery Date: ${new Date(order.deliveryDate!).toLocaleDateString()}</li>
        </ul>
        <p>Thank you for using our service! We hope you enjoyed your experience.</p>
        <p>If you have any feedback, please don't hesitate to contact us.</p>
      `
    };

    try {
      await EmailService.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send delivery confirmation:', error);
      throw error;
    }
  }

  async sendGuestOrderConfirmation(email: string, order: IOrder): Promise<void> {
    const mailOptions = {
      from: `Logistics System <${config.email.auth.user}>`,
      to: email,
      subject: `Order Confirmation - ${order.trackingNumber}`,
      html: `
        <h2>Order Confirmation</h2>
        <p>Thank you for your order!</p>
        <p><strong>Order Details:</strong></p>
        <ul>
          <li>Tracking Number: ${order.trackingNumber}</li>
          <li>Package Size: ${order.packageSize}</li>
          <li>Price: ₦${order.price}</li>
          <li>Estimated Delivery: ${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</li>
        </ul>
        <p><strong>Delivery Address:</strong></p>
        <p>${this.formatAddress(order.deliveryAddress)}</p>
        <p>Track your order at: ${process.env.FRONTEND_URL}/track/${order.trackingNumber}</p>
        <p>Thank you for choosing our service!</p>
      `
    };

    try {
      await EmailService.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send guest order confirmation:', error);
      throw error;
    }
  }

  async sendConsumerOrderConfirmation(recipient: IEmailRecipient, order: IOrder): Promise<void> {
    const mailOptions = {
      from: `Logistics System <${config.email.auth.user}>`,
      to: recipient.email,
      subject: `Order Confirmation - ${order.trackingNumber}`,
      html: `
        <h2>Order Confirmation</h2>
        <p>Hello ${recipient.name},</p>
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
      await EmailService.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  async sendConsumerOrderStatusUpdate(
    consumer: { email: string; firstName: string },
    order: IOrder,
    notes?: string
  ): Promise<void> {
    const statusMessages: { [key: string]: string } = {
      PENDING: 'Your order is pending processing.',
      CONFIRMED: 'Your order has been confirmed and is being processed.',
      PICKED_UP: 'Your order has been picked up and is on its way.',
      IN_TRANSIT: 'Your order is in transit to the delivery location.',
      DELIVERED: 'Your order has been successfully delivered.',
      CANCELLED: 'Your order has been cancelled.',
      FAILED_DELIVERY: 'Delivery attempt failed. Our team will contact you shortly.'
    };

    const message = statusMessages[order.status] || 'Your order status has been updated.';
    const additionalNotes = notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : '';

    const mailOptions = {
      from: `Logistics System <${config.email.auth.user}>`,
      to: consumer.email,
      subject: `Order Status Update - ${order.trackingNumber}`,
      html: `
        <h2>Order Status Update</h2>
        <p>Hello ${consumer.firstName},</p>
        <p>${message}</p>
        ${additionalNotes}
        <p><strong>Order Details:</strong></p>
        <ul>
          <li>Tracking Number: ${order.trackingNumber}</li>
          <li>Status: ${order.status}</li>
          <li>Estimated Delivery: ${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</li>
        </ul>
        <p>Track your order at: ${process.env.FRONTEND_URL}/track/${order.trackingNumber}</p>
        <p>Thank you for using our service!</p>
      `
    };

    try {
      await EmailService.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send status update email:', error);
      throw error;
    }
  }

  async sendPaymentVerificationEmail(
    consumer: { email: string; firstName: string },
    order: IOrder,
    verified: boolean,
    notes?: string
  ): Promise<void> {
    const subject = `Payment ${verified ? 'Verified' : 'Rejected'}`;
    const html = `
      <h2>Payment ${verified ? 'Verified' : 'Rejected'}</h2>
      <p>Dear ${consumer.firstName},</p>
      <p>Your payment for order ${order.trackingNumber} has been ${verified ? 'verified' : 'rejected'}.</p>
      ${notes ? `<p><strong>Admin Notes:</strong> ${notes}</p>` : ''}
      <p>Thank you for using our service.</p>
    `;

    await EmailService.sendEmail(consumer.email, subject, html);
  }

  async sendPaymentNotification(order: any): Promise<void> {
    const emailData = {
      to: 'wisdomabraham92@gmail.com', // Updated admin email
      subject: `New Payment Notification - Order #${order.trackingNumber}`,
      html: `
        <h2>New Payment Notification</h2>
        <p>New payment has been marked for Order #${order.trackingNumber}</p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>Amount: ₦${order.paymentAmount}</li>
          <li>Reference: ${order.paymentReference}</li>
          <li>Customer: ${order.userId.firstName} ${order.userId.lastName}</li>
        </ul>
        <p>Please verify the payment in the admin dashboard.</p>
        
      `
    };

    // Use the static method
    await EmailService.sendEmail(emailData.to, emailData.subject, emailData.html);
  }
}

// Export the sendEmail function separately
export const sendEmail = EmailService.sendEmail; 
