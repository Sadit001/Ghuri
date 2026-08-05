import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '../constants/messages';
import { destinationService } from '../services/destinationService';
import { sendSuccess } from '../utils/apiResponse';

export const getAllDestinations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { division, category, search } = req.query;
    const destinations = await destinationService.getAllDestinations({
      division: division as string | undefined,
      category: category as string | undefined,
      search: search as string | undefined,
    });
    sendSuccess(res, MESSAGES.DESTINATION.FETCHED, { destinations, count: destinations.length });
  } catch (error) {
    next(error);
  }
};

export const getDestinationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const destination = await destinationService.getDestinationById(req.params.id);
    sendSuccess(res, MESSAGES.DESTINATION.FETCHED, { destination });
  } catch (error) {
    next(error);
  }
};

export const getAllHotels = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { division, destination } = req.query;
    const hotels = await destinationService.getAllHotels({
      division: division as string | undefined,
      destination: destination as string | undefined,
    });
    sendSuccess(res, 'Hotels retrieved.', { hotels, count: hotels.length });
  } catch (error) {
    next(error);
  }
};

export const getHotelById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const hotel = await destinationService.getHotelById(req.params.id);
    sendSuccess(res, 'Hotel details retrieved.', { hotel });
  } catch (error) {
    next(error);
  }
};
