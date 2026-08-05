import { Router } from 'express';
import {
  submitComplaint,
  getUserComplaints,
  getComplaintById,
  updateComplaintStatus,
} from '../controllers/feedbackController';
import { submitComplaintValidationRules } from '../validators/feedbackValidator';
import { validate } from '../middleware/validateMiddleware';
import { authenticate } from '../middleware/authMiddleware';
import { uploadImages } from '../middleware/uploadMiddleware';

const router = Router();

router.use(authenticate);

/** POST /api/complaints */
router.post('/', uploadImages, submitComplaintValidationRules, validate, submitComplaint);

/** GET /api/complaints */
router.get('/', getUserComplaints);

/** GET /api/complaints/:id */
router.get('/:id', getComplaintById);

/** PATCH /api/complaints/:id/status */
router.patch('/:id/status', updateComplaintStatus);

export default router;
