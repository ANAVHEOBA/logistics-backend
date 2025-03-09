import { config } from './environment';

export const paystackConfig = {
  secretKey: process.env.PAYSTACK_SECRET_KEY || 'sk_test_689c168be877c584bb283fc3be28b8c819f46e82',
  publicKey: process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_65078cf912f4ba0f93317e14427fea8d8dc58fae',
  baseUrl: 'https://api.paystack.co',
  renderDomain: process.env.RENDER_DOMAIN || 'http://localhost:3000',
  webhookSecret: process.env.PAYSTACK_WEBHOOK_SECRET || 'your-webhook-secret'
};

export const getCallbackUrls = (orderId: string) => ({
  successUrl: `${config.baseUrl}/api/payments/success/${orderId}`,
  cancelUrl: `${config.baseUrl}/api/payments/cancel/${orderId}`,
  webhookUrl: `${paystackConfig.renderDomain}/api/payments/webhook`
});