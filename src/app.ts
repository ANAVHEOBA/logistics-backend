import express from 'express';
import cors from 'cors';
import userRouter from './modules/user/user.router';
import addressRouter from './modules/address/address.router';
import orderRouter from './modules/order/order.router';
import adminRouter from './modules/admin/admin.router';
import storeRouter from './modules/store/store.router';
import productRouter from './modules/product/product.router';
import consumerRouter from './modules/consumer/consumer.router';
import zoneRouter from './modules/zone/zone.router';
import paymentRouter from './modules/payment/payment.router';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/addresses', addressRouter);
app.use('/api/orders', orderRouter);
app.use('/api/admin', adminRouter);
app.use('/api/stores', storeRouter);
app.use('/api/products', productRouter);
app.use('/api/consumers', consumerRouter);
app.use('/api/zones', zoneRouter);
app.use('/api/payments', paymentRouter);

// Store frontend routes
app.get('/store/:slug', (req, res) => {
  // For now, just redirect to the API endpoint
  // Later, you'll want to serve your frontend application here
  res.redirect(`/api/stores/${req.params.slug}`);
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

export { app };