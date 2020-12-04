import { Router } from 'express';
import Service_requestController from '../controllers/Service_requestController';
const router = Router();

router.get('/', Service_requestController.getAllService_requests);
router.post('/', Service_requestController.addService_request);
router.get('/id=:id', Service_requestController.getService_requestById);
router.put('/id=:id', Service_requestController.updateService_requestById);
router.delete('/id=:id', Service_requestController.deleteService_requestById);

export default router;