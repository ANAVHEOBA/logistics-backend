import express from 'express';
import { StoreController } from './store.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateStore } from './store.validator';

const router = express.Router();
const storeController = new StoreController();

// Store routes
router.post('/setup', authMiddleware, validateStore, storeController.createStore);
router.get('/me', authMiddleware, storeController.getMyStore);
router.put('/me', authMiddleware, validateStore, storeController.updateStore);
router.get('/dashboard', authMiddleware, storeController.getStoreDashboard);

export default router; 