import { Router } from 'express';
import { getAllAgencies, getAgencyById } from '../controllers/guideController';

const router = Router();

/** GET /api/agencies */
router.get('/', getAllAgencies);

/** GET /api/agencies/:id */
router.get('/:id', getAgencyById);

export default router;
