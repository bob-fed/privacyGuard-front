import { Router } from 'express';
import { getPolicies, generatePolicy } from '../controllers/policyController';
import { validateRequest, schemas } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', getPolicies);
router.post('/generate', validateRequest(schemas.generatePolicy), generatePolicy);

export default router;