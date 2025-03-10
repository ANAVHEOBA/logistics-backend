import { Router } from 'express';
import { ZoneController } from './zone.controller';
import { adminMiddleware } from '../../middleware/admin.middleware';

const router = Router();
const zoneController = new ZoneController();

// Public routes
router.get('/', zoneController.getAllZones);
router.get('/active', zoneController.getActiveZones);

// Admin routes
router.use(adminMiddleware);
router.post('/', zoneController.createZone);
router.put('/:id', zoneController.updateZone);
router.delete('/:id', zoneController.deleteZone);

export default router;