import { Router } from 'express';
import { AddressController } from './address.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
const addressController = new AddressController();

// All routes require authentication
router.use(authMiddleware);

// Address routes
router.post('/', addressController.createAddress);
router.get('/', addressController.getUserAddresses);
router.get('/:id', addressController.getAddressById);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

export default router;