import { Router } from 'express';
import {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  calculateCost,
  getTripSummary,
} from '../controllers/tripController';
import { createTripValidationRules, calculateCostValidationRules } from '../validators/tripValidator';
import { validate } from '../middleware/validateMiddleware';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

/** POST /api/trips/calculate-cost */
router.post('/calculate-cost', calculateCostValidationRules, validate, calculateCost);

/** POST /api/trips */
router.post('/', createTripValidationRules, validate, createTrip);

/** GET /api/trips */
router.get('/', getUserTrips);

/** GET /api/trips/:id */
router.get('/:id', getTripById);

/** GET /api/trips/:id/summary */
router.get('/:id/summary', getTripSummary);

/** PUT /api/trips/:id */
router.put('/:id', updateTrip);

/** DELETE /api/trips/:id */
router.delete('/:id', deleteTrip);

export default router;
