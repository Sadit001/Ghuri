import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '../constants/messages';
import { guideService } from '../services/guideService';
import { sendSuccess } from '../utils/apiResponse';
import { BookGuideDto, GuideBookingCheckRequest } from '../types/guide';

export const getAllGuides = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { division, specialization } = req.query;
    const guides = await guideService.getAllGuides(
      division as string | undefined,
      specialization as string | undefined
    );
    sendSuccess(res, MESSAGES.GUIDE.FETCHED, { guides, count: guides.length });
  } catch (error) {
    next(error);
  }
};

export const getGuideById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const guide = await guideService.getGuideById(req.params.id);
    sendSuccess(res, MESSAGES.GUIDE.FETCHED, { guide });
  } catch (error) {
    next(error);
  }
};

export const checkAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await guideService.checkAvailability(req.body as GuideBookingCheckRequest);
    sendSuccess(res, result.message, result);
  } catch (error) {
    next(error);
  }
};

export const bookGuide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await guideService.bookGuide(req.user!.uid, req.body as BookGuideDto);
    sendSuccess(res, MESSAGES.GUIDE.BOOKED, { booking }, 201);
  } catch (error) {
    next(error);
  }
};

export const submitGuideReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { rating, text, photos } = req.body;
    const review = await guideService.submitReview(req.user!.uid, req.params.id, rating, text, photos);
    sendSuccess(res, MESSAGES.GUIDE.REVIEW_SUBMITTED, { review }, 201);
  } catch (error) {
    next(error);
  }
};

export const getAllAgencies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { division } = req.query;
    const agencies = await guideService.getAllAgencies(division as string | undefined);
    sendSuccess(res, 'Agencies retrieved.', { agencies, count: agencies.length });
  } catch (error) {
    next(error);
  }
};

export const getAgencyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const agency = await guideService.getAgencyById(req.params.id);
    sendSuccess(res, 'Agency details retrieved.', { agency });
  } catch (error) {
    next(error);
  }
};
