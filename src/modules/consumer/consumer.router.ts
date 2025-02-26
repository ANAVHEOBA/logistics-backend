import express from 'express';
import { ConsumerController } from './consumer.controller';
import { authenticateConsumer } from '../../middleware/consumer.middleware';
import { validateConsumerRegistration } from './consumer.validator';

const router = express.Router();
const consumerController = new ConsumerController();

// Public routes
router.post('/register', validateConsumerRegistration, consumerController.register);
router.post('/verify-email', consumerController.verifyEmail);
router.post('/login', consumerController.login);
router.post('/forgot-password', consumerController.forgotPassword);
router.post('/reset-password', consumerController.resetPassword);

// Protected routes - require consumer authentication
router.use(authenticateConsumer);
router.get('/profile', consumerController.getProfile);
router.put('/profile', consumerController.updateProfile);
router.post('/rate-store', consumerController.rateStore);
router.get('/store-ratings/:storeId', consumerController.getStoreRatings);
router.post('/favorite-store/:storeId', consumerController.addFavoriteStore);
router.delete('/favorite-store/:storeId', consumerController.removeFavoriteStore);
router.put('/preferred-categories', consumerController.updatePreferredCategories);

export default router;