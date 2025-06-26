import { Router } from 'express';
import { getSettings, updateSettings, updateProfile } from '../controllers/settingsController';
import { validateRequest, schemas } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', getSettings);
router.put('/', validateRequest(schemas.userSettings), updateSettings);
router.put('/profile', updateProfile);

export default router;