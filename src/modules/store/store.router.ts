import { Router } from 'express';
import { StoreController } from './store.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { upload } from './store.controller';

const router = Router();
const storeController = new StoreController();

// Public routes (no auth required)
router.get('/list', storeController.listStores);

// Protected routes (require authentication)
router.post('/', authMiddleware, storeController.createStore);
router.get('/my-store', authMiddleware, storeController.getMyStore);
router.put('/', authMiddleware, storeController.updateStore);
router.delete('/', authMiddleware, storeController.deleteStore);

// Store metrics and dashboard
router.get('/metrics', authMiddleware, storeController.getStoreMetrics);
router.get('/revenue', authMiddleware, storeController.getStoreRevenue);
router.get('/dashboard', authMiddleware, storeController.getStoreDashboard);

// Store settings and status
router.put('/settings', authMiddleware, storeController.updateStoreSettings);
router.post('/activate', authMiddleware, storeController.activateStore);

// Image upload route
router.post('/upload-image', authMiddleware, upload.single('image'), storeController.uploadStoreImage);

// Store address routes
router.post('/address', authMiddleware, storeController.addStoreAddress);
router.put('/address', authMiddleware, storeController.updateStoreAddress);

// Store order management routes
router.get('/orders', authMiddleware, storeController.getStoreOrders);
router.get('/orders/:orderId', authMiddleware, storeController.getStoreOrderDetails);
router.put('/orders/:orderId/ready', authMiddleware, storeController.markOrderReady);

// Payment details routes
router.post('/payment-details', authMiddleware, storeController.addPaymentDetails);
router.put('/payment-details', authMiddleware, storeController.updatePaymentDetails);
router.get('/payment-details', authMiddleware, storeController.getPaymentDetails);

// Store customers
router.get('/customers', authMiddleware, storeController.getStoreCustomers);

// Public routes (no auth required) - Move these AFTER the specific routes
router.get('/:slug', storeController.getPublicStore);
router.get('/:slug/products', storeController.getStoreProducts);
router.post('/:slug/orders/guest', storeController.createGuestOrder);

export default router; 