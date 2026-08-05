import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { tripService } from '../services/tripService';
import { sendSuccess } from '../utils/apiResponse';
import { CostCalculationRequest, TripPlan } from '../types/trip';

export const createTrip = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const trip = await tripService.createTrip(req.user!.uid, req.body as Partial<TripPlan>);
    sendSuccess(res, MESSAGES.TRIP.CREATED, { trip }, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const getUserTrips = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const trips = await tripService.getUserTrips(req.user!.uid);
    sendSuccess(res, MESSAGES.TRIP.FETCHED, { trips });
  } catch (error) {
    next(error);
  }
};

export const getTripById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const trip = await tripService.getTripById(req.params.id);
    sendSuccess(res, MESSAGES.TRIP.FETCHED, { trip });
  } catch (error) {
    next(error);
  }
};

export const updateTrip = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const trip = await tripService.updateTrip(req.params.id, req.user!.uid, req.body);
    sendSuccess(res, MESSAGES.TRIP.UPDATED, { trip });
  } catch (error) {
    next(error);
  }
};

export const deleteTrip = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await tripService.deleteTrip(req.params.id, req.user!.uid);
    sendSuccess(res, MESSAGES.TRIP.DELETED);
  } catch (error) {
    next(error);
  }
};

export const calculateCost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = tripService.calculateCost(req.body as CostCalculationRequest);
    sendSuccess(res, MESSAGES.TRIP.CALCULATED, { result });
  } catch (error) {
    next(error);
  }
};

export const getTripSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const trip = await tripService.getTripById(req.params.id);
    const summary = {
      tripTitle: trip.title,
      destination: trip.destination,
      division: trip.division,
      duration: `${trip.totalDays} days (${trip.startDate} to ${trip.endDate})`,
      travelers: {
        adults: trip.adultsCount,
        children: trip.childrenCount,
      },
      budgetType: trip.budgetType,
      transportMode: trip.transportMode,
      estimatedTotalCost: trip.estimatedTotalCost,
      status: trip.status,
      itinerary: trip.itinerary,
      generatedAt: new Date().toISOString(),
    };
    sendSuccess(res, 'Trip summary generated.', { summary });
  } catch (error) {
    next(error);
  }
};
