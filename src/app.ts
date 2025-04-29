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
import { cartRouter } from './modules/cart/cart.router';
import { errorHandler } from './middleware/error.middleware';
import bodyParser from 'body-parser';

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://www.gofroma2zafrica.com',
    'https://www.admin.gofroma2zafrica.com',
    'https://admin.gofroma2zafrica.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
  maxAge: 86400 // 24 hours
};

// Apply CORS with options
app.use(cors(corsOptions));

// Add CORS headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use('/api/cart', cartRouter);

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