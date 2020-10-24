import { Router } from 'express';
import UserController from '../controllers/UserController';
const router = Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.addUser);
router.get('/id=:id', UserController.getUserById);
router.put('/id=:id', UserController.updateUserById);
router.delete('/id=:id', UserController.deleteUserById);

router.get('/email', UserController.getUserByEmail);
router.get('/workers', UserController.getAllWorkers);

export default router;