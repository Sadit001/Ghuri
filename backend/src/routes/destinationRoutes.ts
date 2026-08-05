import { Router } from 'express';
import {
  getAllDestinations,
  getDestinationById,
  getAllHotels,
  getHotelById,
} from '../controllers/destinationController';

const router = Router();

// Public — no auth required for browsing destinations
/** GET /api/destinations */
router.get('/', getAllDestinations);

/** GET /api/destinations/:id */
router.get('/:id', getDestinationById);

export default router;
