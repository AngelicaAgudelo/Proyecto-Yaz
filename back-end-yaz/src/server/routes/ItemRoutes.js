import { Router } from 'express';
import ItemController from '../controllers/ItemController';
const router = Router();

router.get('/', ItemController.getAllItems);
router.post('/', ItemController.addItem);
router.get('/id=:id', ItemController.getItemById);
router.put('/id=:id', ItemController.updateItemById);
router.delete('/id=:id', ItemController.deleteItemById);

export default router;