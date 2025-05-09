import nodemailer from 'nodemailer';
import { config } from '../config/environment';
import { IOrder } from '../modules/order/order.model';
import { IUser } from '../modules/user/user.model';
import { IOrderItemResponse } from '../modules/orderItem/orderItem.model';

interface IEmailRecipient {
  email: string;
  name: string;
}

const emailStyles = `
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #000000;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #000000;
      color: #FFD700;
      padding: 30px;
      text-align: center;
      border-radius: 5px 5px 0 0;
      border-bottom: 3px solid #FFD700;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .content {
      background-color: #ffffff;
      padding: 30px;
      border: 1px solid #FFD700;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
      border-top: 1px solid #FFD700;
      margin-top: 20px;
    }
    .button {
      display: inline-block;
      padding: 12px 25px;
      background-color: #000000;
      color: #FFD700;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
      border: 2px solid #FFD700;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s ease;
    }
    .button:hover {
      background-color: #FFD700;
      color: #000000;
    }
    .details {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 5px;
      margin: 20px 0;
      border: 1px solid #FFD700;
    }
    .details h3 {
      color: #000000;
      margin-top: 0;
      border-bottom: 2px solid #FFD700;
      padding-bottom: 10px;
    }
    .status {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 3px;
      font-weight: bold;
      color: #000000;
    }
    .status-pending { background-color: #FFD700; }
    .status-confirmed { background-color: #FFD700; }
    .status-cancelled { background-color: #FFD700; }
    .status-delivered { background-color: #FFD700; }
    .price {
      color: #000000;
      font-weight: bold;
      font-size: 18px;
    }
    .tracking-number {
      background-color: #000000;
      color: #FFD700;
      padding: 5px 10px;
      border-radius: 3px;
      font-family: monospace;
    }
    .highlight {
      color: #FFD700;
      font-weight: bold;
    }
  </style>
`;

export class EmailService {
  private static transporter: nodemailer.Transporter;

  constructor() {
    if (!EmailService.transporter) {
      EmailService.transporter = nodemailer.createTransport({
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

      EmailService.transporter.verify((error, success) => {
        if (error) {
          console.error('Email configuration error:', error);
        } else {
          console.log('Email service is ready');
        }
      });
    }
  }

  static async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: `${config.email.auth.user}`,
      to,
      subject,
      html: `${emailStyles}${html}`
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

    const html = `
      <div class="container">
        <div class="header">
          <h1>Order Status Update</h1>
        </div>
        <div class="content">
          <p>Hello <span class="highlight">${user.name}</span>,</p>
          <p>${message}</p>
          ${additionalNotes}
          <div class="details">
            <h3>Order Details</h3>
            <p><strong>Tracking Number:</strong> <span class="tracking-number">${order.trackingNumber}</span></p>
            <p><strong>Status:</strong> <span class="status status-${order.status.toLowerCase()}">${order.status}</span></p>
            <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>
          </div>
          <a href="${process.env.FRONTEND_URL}/track/${order.trackingNumber}" class="button">Track Your Order</a>
        </div>
        <div class="footer">
          <p>Thank you for using our service!</p>
          <p>© ${new Date().getFullYear()} GoFromA2Z Africa. All rights reserved.</p>
        </div>
      </div>
    `;

    await EmailService.sendEmail(user.email, `Order Status Update - ${order.trackingNumber}`, html);
  }

  async sendOrderConfirmation(user: IUser, order: IOrder): Promise<void> {
    const html = `
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
        </div>
        <div class="content">
          <p>Hello <span class="highlight">${user.name}</span>,</p>
          <p>Your order has been successfully placed!</p>
          <div class="details">
            <h3>Order Details</h3>
            <p><strong>Tracking Number:</strong> <span class="tracking-number">${order.trackingNumber}</span></p>
            <p><strong>Package Size:</strong> ${order.packageSize}</p>
            <p><strong>Price:</strong> <span class="price">₦${order.price}</span></p>
            <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>
          </div>
          <div class="details">
            <h3>Delivery Address</h3>
            <p>${this.formatAddress(order.deliveryAddress)}</p>
          </div>
          <a href="${process.env.FRONTEND_URL}/track/${order.trackingNumber}" class="button">Track Your Order</a>
        </div>
        <div class="footer">
          <p>Thank you for choosing our service!</p>
          <p>© ${new Date().getFullYear()} GoFromA2Z Africa. All rights reserved.</p>
        </div>
      </div>
    `;

    await EmailService.sendEmail(user.email, `Order Confirmation - ${order.trackingNumber}`, html);
  }

  private formatAddress(address: any): string {
    if (typeof address === 'string') {
      return 'Saved address will be used for delivery';
    }
    
    return `
      ${address.street},<br>
      ${address.city},<br>
      ${address.state},<br>
      ${address.country},<br>
      ${address.postalCode}<br>
      <strong>Recipient:</strong> ${address.recipientName}<br>
      <strong>Phone:</strong> ${address.recipientPhone}
    `;
  }

  async sendStoreOrderNotification(
    storeEmail: string, 
    order: IOrder, 
    items: IOrderItemResponse[]
  ): Promise<void> {
    const html = `
      <div class="container">
        <div class="header">
          <h1>New Order Received</h1>
        </div>
        <div class="content">
          <p>You have received a new order!</p>
          <div class="details">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Tracking Number:</strong> <span class="tracking-number">${order.trackingNumber}</span></p>
            <p><strong>Status:</strong> <span class="status status-${order.status.toLowerCase()}">${order.status}</span></p>
          </div>
          <div class="details">
            <h3>Items</h3>
            ${items.map(item => `
              <div style="margin-bottom: 10px; padding: 10px; border-bottom: 1px solid #FFD700;">
                <p><strong>Product ID:</strong> ${item.productId}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Price:</strong> <span class="price">₦${item.price}</span></p>
              </div>
            `).join('')}
          </div>
          <p>Please prepare these items for pickup.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} GoFromA2Z Africa. All rights reserved.</p>
        </div>
      </div>
    `;

    await EmailService.sendEmail(storeEmail, `New Order Received - ${order.trackingNumber}`, html);
  }

  async sendDeliveryConfirmation(user: IUser, order: IOrder): Promise<void> {
    const html = `
      <div class="container">
        <div class="header">
          <h1>Delivery Confirmation</h1>
        </div>
        <div class="content">
          <p>Hello <span class="highlight">${user.name}</span>,</p>
          <p>Your order has been successfully delivered!</p>
          <div class="details">
            <h3>Order Details</h3>
            <p><strong>Tracking Number:</strong> <span class="tracking-number">${order.trackingNumber}</span></p>
            <p><strong>Delivery Date:</strong> ${new Date(order.deliveryDate!).toLocaleDateString()}</p>
          </div>
          <p>Thank you for using our service! We hope you enjoyed your experience.</p>
          <p>If you have any feedback, please don't hesitate to contact us.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} GoFromA2Z Africa. All rights reserved.</p>
        </div>
      </div>
    `;

    await EmailService.sendEmail(user.email, `Delivery Confirmation - ${order.trackingNumber}`, html);
  }

  async sendGuestOrderConfirmation(email: string, order: IOrder): Promise<void> {
    const html = `
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
        </div>
        <div class="content">
          <p>Thank you for your order!</p>
          <div class="details">
            <h3>Order Details</h3>
            <p><strong>Tracking Number:</strong> <span class="tracking-number">${order.trackingNumber}</span></p>
            <p><strong>Package Size:</strong> ${order.packageSize}</p>
            <p><strong>Price:</strong> <span class="price">₦${order.price}</span></p>
            <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>
          </div>
          <div class="details">
            <h3>Delivery Address</h3>
            <p>${this.formatAddress(order.deliveryAddress)}</p>
          </div>
          <a href="${process.env.FRONTEND_URL}/track/${order.trackingNumber}" class="button">Track Your Order</a>
        </div>
        <div class="footer">
          <p>Thank you for choosing our service!</p>
          <p>© ${new Date().getFullYear()} GoFromA2Z Africa. All rights reserved.</p>
        </div>
      </div>
    `;

    await EmailService.sendEmail(email, `Order Confirmation - ${order.trackingNumber}`, html);
  }

  async sendConsumerOrderConfirmation(recipient: IEmailRecipient, order: IOrder): Promise<void> {
    const html = `
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
        </div>
        <div class="content">
          <p>Hello <span class="highlight">${recipient.name}</span>,</p>
          <p>Your order has been successfully placed!</p>
          <div class="details">
            <h3>Order Details</h3>
            <p><strong>Tracking Number:</strong> <span class="tracking-number">${order.trackingNumber}</span></p>
            <p><strong>Package Size:</strong> ${order.packageSize}</p>
            <p><strong>Price:</strong> <span class="price">₦${order.price}</span></p>
            <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>
          </div>
          <div class="details">
            <h3>Delivery Address</h3>
            <p>${this.formatAddress(order.deliveryAddress)}</p>
          </div>
          <a href="${process.env.FRONTEND_URL}/track/${order.trackingNumber}" class="button">Track Your Order</a>
        </div>
        <div class="footer">
          <p>Thank you for choosing our service!</p>
          <p>© ${new Date().getFullYear()} GoFromA2Z Africa. All rights reserved.</p>
        </div>
      </div>
    `;

    await EmailService.sendEmail(recipient.email, `Order Confirmation - ${order.trackingNumber}`, html);
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

    const html = `
      <div class="container">
        <div class="header">
          <h1>Order Status Update</h1>
        </div>
        <div class="content">
          <p>Hello <span class="highlight">${consumer.firstName}</span>,</p>
          <p>${message}</p>
          ${additionalNotes}
          <div class="details">
            <h3>Order Details</h3>
            <p><strong>Tracking Number:</strong> <span class="tracking-number">${order.trackingNumber}</span></p>
            <p><strong>Status:</strong> <span class="status status-${order.status.toLowerCase()}">${order.status}</span></p>
            <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>
          </div>
          <a href="${process.env.FRONTEND_URL}/track/${order.trackingNumber}" class="button">Track Your Order</a>
        </div>
        <div class="footer">
          <p>Thank you for using our service!</p>
          <p>© ${new Date().getFullYear()} GoFromA2Z Africa. All rights reserved.</p>
        </div>
      </div>
    `;

    await EmailService.sendEmail(consumer.email, `Order Status Update - ${order.trackingNumber}`, html);
  }

  async sendPaymentVerificationEmail(
    consumer: { email: string; firstName: string },
    order: IOrder,
    verified: boolean,
    notes?: string
  ): Promise<void> {
    const subject = `Payment ${verified ? 'Verified' : 'Rejected'}`;
    const html = `
      <div class="container">
        <div class="header" style="background-color: ${verified ? '#000000' : '#000000'}">
          <h1>Payment ${verified ? 'Verified' : 'Rejected'}</h1>
        </div>
        <div class="content">
          <p>Dear <span class="highlight">${consumer.firstName}</span>,</p>
          <p>Your payment for order <span class="tracking-number">${order.trackingNumber}</span> has been ${verified ? 'verified' : 'rejected'}.</p>
          ${notes ? `<div class="details"><p><strong>Admin Notes:</strong> ${notes}</p></div>` : ''}
          <a href="${process.env.FRONTEND_URL}/track/${order.trackingNumber}" class="button">View Order Details</a>
        </div>
        <div class="footer">
          <p>Thank you for using our service.</p>
          <p>© ${new Date().getFullYear()} GoFromA2Z Africa. All rights reserved.</p>
        </div>
      </div>
    `;

    await EmailService.sendEmail(consumer.email, subject, html);
  }

  async sendPaymentNotification(order: any): Promise<void> {
    const html = `
      <div class="container">
        <div class="header">
          <h1>New Payment Notification</h1>
        </div>
        <div class="content">
          <p>New payment has been marked for Order <span class="tracking-number">#${order.trackingNumber}</span></p>
          <div class="details">
            <h3>Payment Details</h3>
            <p><strong>Amount:</strong> <span class="price">₦${order.paymentAmount}</span></p>
            <p><strong>Reference:</strong> ${order.paymentReference}</p>
            <p><strong>Customer:</strong> <span class="highlight">${order.userId.firstName} ${order.userId.lastName}</span></p>
          </div>
          <p>Please verify the payment in the admin dashboard.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} GoFromA2Z Africa. All rights reserved.</p>
        </div>
      </div>
    `;

    await EmailService.sendEmail('wisdomabraham92@gmail.com', `New Payment Notification - Order #${order.trackingNumber}`, html);
  }
}

export const sendEmail = EmailService.sendEmail;