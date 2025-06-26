import { Router } from 'express';
import {
  getDataRequests,
  createDataRequest,
  updateDataRequest,
  deleteDataRequest,
  getDataRequestStats
} from '../controllers/dataRequestController';
import { validateRequest, schemas } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', getDataRequests);
router.post('/', validateRequest(schemas.dataRequest), createDataRequest);
router.put('/:id', validateRequest(schemas.updateDataRequest), updateDataRequest);
router.delete('/:id', deleteDataRequest);
router.get('/stats', getDataRequestStats);

export default router;