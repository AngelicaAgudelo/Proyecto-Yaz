import { Router } from 'express';
import Payment_itemsController from '../controllers/Payment_itemsController';
const router = Router();

router.get('/', Payment_itemsController.getAllPayment_items);
router.post('/', Payment_itemsController.addPayment_items);
router.get('/:id', Payment_itemsController.getPayment_itemsById);
router.put('/:id', Payment_itemsController.updatePayment_itemsById);
router.delete('/:id', Payment_itemsController.deletePayment_itemsById);

export default router;