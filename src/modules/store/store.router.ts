import express from 'express';
import { StoreController } from './store.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();
const storeController = new StoreController();

// Add this new public route at the top
router.get('/list', storeController.listStores);  // New endpoint for listing stores

// Protected routes (auth required) - Move these BEFORE the :slug routes
router.get('/my-store', authMiddleware, storeController.getMyStore);
router.post('/setup', authMiddleware, storeController.createStore);
router.put('/', authMiddleware, storeController.updateStore);
router.delete('/', authMiddleware, storeController.deleteStore);
router.get('/metrics', authMiddleware, storeController.getStoreMetrics);
router.put('/settings', authMiddleware, storeController.updateStoreSettings);
router.post('/activate', authMiddleware, storeController.activateStore);

// Public routes (no auth required) - Move these AFTER the specific routes
router.get('/:slug', storeController.getPublicStore);
router.get('/:slug/products', storeController.getStoreProducts);
router.post('/:slug/orders', storeController.createGuestOrder);

export default router; 