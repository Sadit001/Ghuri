import { Router } from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
} from '../controllers/bookingController';
import { createBookingValidationRules } from '../validators/bookingValidator';
import { validate } from '../middleware/validateMiddleware';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

/** POST /api/bookings */
router.post('/', createBookingValidationRules, validate, createBooking);

/** GET /api/bookings */
router.get('/', getUserBookings);

/** GET /api/bookings/:id */
router.get('/:id', getBookingById);

/** PATCH /api/bookings/:id/status */
router.patch('/:id/status', updateBookingStatus);

/** POST /api/bookings/:id/cancel */
router.post('/:id/cancel', cancelBooking);

export default router;
