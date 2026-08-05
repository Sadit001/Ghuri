import { Router } from 'express';
import { register, login, logout, me } from '../controllers/authController';
import { registerValidationRules, loginValidationRules } from '../validators/authValidator';
import { validate } from '../middleware/validateMiddleware';
import { authenticate } from '../middleware/authMiddleware';
import { authRateLimiter } from '../middleware/rateLimiter';

const router = Router();

/** POST /api/auth/register */
router.post('/register', authRateLimiter, registerValidationRules, validate, register);

/** POST /api/auth/login */
router.post('/login', authRateLimiter, loginValidationRules, validate, login);

/** POST /api/auth/logout */
router.post('/logout', authenticate, logout);

/** GET /api/auth/me - validate session and get current user */
router.get('/me', authenticate, me);

export default router;
