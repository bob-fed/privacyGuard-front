import { Router } from 'express';
import {
  getAlerts,
  markAlertAsRead,
  getComplianceMetrics
} from '../controllers/complianceController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/alerts', getAlerts);
router.put('/alerts/:id/read', markAlertAsRead);
router.get('/metrics', getComplianceMetrics);

export default router;