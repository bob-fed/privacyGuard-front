import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { validateRequest, schemas } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/register', validateRequest(schemas.register), register);
router.post('/login', validateRequest(schemas.login), login);
router.get('/profile', authenticateToken, getProfile);

export default router;