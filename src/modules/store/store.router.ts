import express from 'express';
import { StoreController } from './store.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();
const storeController = new StoreController();

// Public routes (no auth required)
router.get('/:slug', storeController.getPublicStore);
router.get('/:slug/products', storeController.getStoreProducts);
router.post('/:slug/orders', storeController.createGuestOrder);  // New guest order endpoint

// Protected routes (auth required)
router.post('/setup', authMiddleware, storeController.createStore);
router.get('/my-store', authMiddleware, storeController.getMyStore);
router.put('/', authMiddleware, storeController.updateStore);
router.delete('/', authMiddleware, storeController.deleteStore);
router.get('/metrics', authMiddleware, storeController.getStoreMetrics);
router.put('/settings', authMiddleware, storeController.updateStoreSettings);
router.post('/activate', authMiddleware, storeController.activateStore);

export default router; 