import { Router } from 'express';
import { getAllHotels, getHotelById } from '../controllers/destinationController';

const router = Router();

/** GET /api/hotels */
router.get('/', getAllHotels);

/** GET /api/hotels/:id */
router.get('/:id', getHotelById);

export default router;
