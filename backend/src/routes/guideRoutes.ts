import { Router } from 'express';
import {
  getAllGuides,
  getGuideById,
  checkAvailability,
  bookGuide,
  submitGuideReview,
  getAllAgencies,
  getAgencyById,
} from '../controllers/guideController';
import {
  bookGuideValidationRules,
  checkAvailabilityValidationRules,
  submitReviewValidationRules,
} from '../validators/guideValidator';
import { validate } from '../middleware/validateMiddleware';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Public read endpoints (no auth required for browsing)
/** GET /api/guides */
router.get('/', getAllGuides);

/** GET /api/guides/:id */
router.get('/:id', getGuideById);

/** GET /api/agencies */
// Note: agencies sub-routes must be placed before :id to avoid conflicts

// Protected endpoints
/** POST /api/guides/check-availability */
router.post('/check-availability', authenticate, checkAvailabilityValidationRules, validate, checkAvailability);

/** POST /api/guides/book */
router.post('/book', authenticate, bookGuideValidationRules, validate, bookGuide);

/** POST /api/guides/:id/reviews */
router.post('/:id/reviews', authenticate, submitReviewValidationRules, validate, submitGuideReview);

export default router;
