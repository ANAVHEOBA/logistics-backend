import { Router } from 'express';
import { AddressController } from './address.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
const addressController = new AddressController();

// Public routes (no auth required) - Add these BEFORE auth middleware
router.get('/store/:storeId', addressController.getStoreAddress);

// Protected routes - Add auth middleware AFTER public routes
router.use(authMiddleware);

// Address routes that require authentication
router.post('/', addressController.createAddress);
router.get('/', addressController.getUserAddresses);
router.get('/:id', addressController.getAddressById);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

export default router;