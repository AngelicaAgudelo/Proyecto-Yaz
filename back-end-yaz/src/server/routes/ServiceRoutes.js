import { Router } from 'express';
import ServiceController from '../controllers/ServiceController';
const router = Router();

router.get('/', ServiceController.getAllServices);
router.post('/', ServiceController.addService);
router.get('/:id', ServiceController.getServiceById);
router.put('/:id', ServiceController.updateServiceById);
router.delete('/:id', ServiceController.deleteServiceById);

export default router;