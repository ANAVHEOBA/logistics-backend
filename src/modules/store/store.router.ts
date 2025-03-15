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
router.post('/address', authMiddleware, storeController.addStoreAddress);
router.put('/address', authMiddleware, storeController.updateStoreAddress);
router.get('/orders', authMiddleware, storeController.getStoreOrders);
router.get('/revenue', authMiddleware, storeController.getStoreRevenue);
router.get('/products/performance', authMiddleware, storeController.getProductPerformance);
router.get('/dashboard', authMiddleware, storeController.getStoreDashboard);

// Store order management routes
router.get('/orders/:orderId', authMiddleware, storeController.getStoreOrderDetails);
router.post('/orders/:orderId/ready', authMiddleware, storeController.markOrderReady);

// Public routes (no auth required) - Move these AFTER the specific routes
router.get('/:slug', storeController.getPublicStore);
router.get('/:slug/products', storeController.getStoreProducts);
router.post('/:slug/orders', storeController.createGuestOrder);

export default router; 