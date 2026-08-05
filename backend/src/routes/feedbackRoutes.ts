import { Router } from 'express';
import {
  submitFeedback,
  submitComplaint,
  getUserComplaints,
  getComplaintById,
  updateComplaintStatus,
} from '../controllers/feedbackController';
import { submitFeedbackValidationRules, submitComplaintValidationRules } from '../validators/feedbackValidator';
import { validate } from '../middleware/validateMiddleware';
import { authenticate } from '../middleware/authMiddleware';
import { uploadImages } from '../middleware/uploadMiddleware';

const router = Router();

router.use(authenticate);

/** POST /api/feedback */
router.post('/', uploadImages, submitFeedbackValidationRules, validate, submitFeedback);

export default router;
