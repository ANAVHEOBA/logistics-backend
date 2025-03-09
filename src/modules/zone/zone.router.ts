import { Router } from 'express';
import { ZoneController } from './zone.controller';
import { adminMiddleware } from '../../middleware/admin.middleware';

const router = Router();
const controller = new ZoneController();

// Admin routes
router.post('/', adminMiddleware, controller.createZone);
router.get('/', controller.getAllZones);
router.put('/:id', adminMiddleware, controller.updateZone);
router.delete('/:id', adminMiddleware, controller.deleteZone);

export default router;