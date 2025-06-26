import { Router } from 'express';
import { getAudits, createAudit, updateAudit } from '../controllers/auditController';
import { validateRequest, schemas } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', getAudits);
router.post('/', validateRequest(schemas.privacyAudit), createAudit);
router.put('/:id', validateRequest(schemas.privacyAudit), updateAudit);

export default router;