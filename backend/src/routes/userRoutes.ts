import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  uploadAvatar as uploadAvatarController,
  uploadDocuments as uploadDocumentsController,
  getStats,
  getPreferences,
  updatePreferences,
} from '../controllers/userController';
import { updateProfileValidationRules, updatePreferencesValidationRules } from '../validators/userValidator';
import { validate } from '../middleware/validateMiddleware';
import { authenticate } from '../middleware/authMiddleware';
import { uploadAvatar, uploadDocuments } from '../middleware/uploadMiddleware';

const router = Router();

// All profile routes require authentication
router.use(authenticate);

/** GET /api/profile */
router.get('/', getProfile);

/** PUT /api/profile */
router.put('/', updateProfileValidationRules, validate, updateProfile);

/** POST /api/profile/avatar */
router.post('/avatar', uploadAvatar, uploadAvatarController);

/** POST /api/profile/documents */
router.post('/documents', uploadDocuments, uploadDocumentsController);

/** GET /api/profile/stats */
router.get('/stats', getStats);

/** GET /api/profile/preferences */
router.get('/preferences', getPreferences);

/** PUT /api/profile/preferences */
router.put('/preferences', updatePreferencesValidationRules, validate, updatePreferences);

export default router;
