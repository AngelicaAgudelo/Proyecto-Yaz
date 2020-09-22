import { Router } from 'express';
import Payment_serviceController from '../controllers/Payment_serviceController';
const router = Router();

router.get('/', Payment_serviceController.getAllPayment_services);
router.post('/', Payment_serviceController.addPayment_service);
router.get('/:id', Payment_serviceController.getPayment_serviceById);
router.put('/:id', Payment_serviceController.updatePayment_serviceById);
router.delete('/:id', Payment_serviceController.deletePayment_serviceById);

export default router;