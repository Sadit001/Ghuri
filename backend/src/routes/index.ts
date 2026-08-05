import { Router, Request, Response } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import tripRoutes from './tripRoutes';
import bookingRoutes from './bookingRoutes';
import guideRoutes from './guideRoutes';
import agencyRoutes from './agencyRoutes';
import destinationRoutes from './destinationRoutes';
import hotelRoutes from './hotelRoutes';
import feedbackRoutes from './feedbackRoutes';
import complaintRoutes from './complaintRoutes';

const router = Router();

// Health check
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Ghuri Travel API is running.',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Route registry
router.use('/auth', authRoutes);
router.use('/profile', userRoutes);
router.use('/trips', tripRoutes);
router.use('/bookings', bookingRoutes);
router.use('/guides', guideRoutes);
router.use('/agencies', agencyRoutes);
router.use('/destinations', destinationRoutes);
router.use('/hotels', hotelRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/complaints', complaintRoutes);

export default router;
