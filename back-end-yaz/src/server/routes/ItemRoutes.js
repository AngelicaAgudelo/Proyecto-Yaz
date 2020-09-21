import { Router } from 'express';
import ItemController from '../controllers/ItemController';
const router = Router();

router.get('/', ItemController.getAllItems);
router.post('/', ItemController.addItem);
router.get('/:id', ItemController.getItemById);
router.put('/:id', ItemController.updateItemById);
router.delete('/:id', ItemController.deleteItemById);

export default router;