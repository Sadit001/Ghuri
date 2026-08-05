import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { bookingService } from '../services/bookingService';
import { sendSuccess } from '../utils/apiResponse';
import { BookingStatus, BookingType, CreateBookingDto } from '../types/booking';

export const createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await bookingService.createBooking(req.user!.uid, req.body as CreateBookingDto);
    sendSuccess(res, MESSAGES.BOOKING.CREATED, { booking }, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const getUserBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, type } = req.query;
    const bookings = await bookingService.getUserBookings(
      req.user!.uid,
      status as BookingStatus | undefined,
      type as BookingType | undefined
    );
    sendSuccess(res, MESSAGES.BOOKING.FETCHED, { bookings, count: bookings.length });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await bookingService.getBookingById(req.params.id, req.user!.uid);
    sendSuccess(res, MESSAGES.BOOKING.FETCHED, { booking });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.body;
    if (!status) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Status is required.' });
      return;
    }
    const booking = await bookingService.updateBookingStatus(req.params.id, req.user!.uid, status as BookingStatus);
    sendSuccess(res, MESSAGES.BOOKING.UPDATED, { booking });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await bookingService.cancelBooking(req.params.id, req.user!.uid);
    sendSuccess(res, MESSAGES.BOOKING.CANCELLED, { booking });
  } catch (error) {
    next(error);
  }
};
