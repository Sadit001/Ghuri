import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { feedbackService } from '../services/feedbackService';
import { sendSuccess } from '../utils/apiResponse';
import { ComplaintStatus, SubmitComplaintDto, SubmitFeedbackDto } from '../types/feedback';

export const submitFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Attach uploaded image filenames if any
    const images = req.files
      ? (req.files as Express.Multer.File[]).map((f) => `/uploads/${f.filename}`)
      : (req.body.images || []);

    const feedback = await feedbackService.submitFeedback(req.user!.uid, {
      ...req.body,
      images,
    } as SubmitFeedbackDto);

    sendSuccess(res, MESSAGES.FEEDBACK.SUBMITTED, { feedback }, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const submitComplaint = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const images = req.files
      ? (req.files as Express.Multer.File[]).map((f) => `/uploads/${f.filename}`)
      : (req.body.images || []);

    const complaint = await feedbackService.submitComplaint(req.user!.uid, {
      ...req.body,
      images,
    } as SubmitComplaintDto);

    sendSuccess(res, MESSAGES.FEEDBACK.COMPLAINT_FILED, { complaint }, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const getUserComplaints = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const complaints = await feedbackService.getUserComplaints(req.user!.uid);
    sendSuccess(res, 'Complaints retrieved.', { complaints, count: complaints.length });
  } catch (error) {
    next(error);
  }
};

export const getComplaintById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const complaint = await feedbackService.getComplaintById(req.params.id, req.user!.uid);
    sendSuccess(res, 'Complaint details retrieved.', { complaint });
  } catch (error) {
    next(error);
  }
};

export const updateComplaintStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, adminResponse } = req.body;
    if (!status) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Status is required.' });
      return;
    }
    const complaint = await feedbackService.updateComplaintStatus(req.params.id, status as ComplaintStatus, adminResponse);
    sendSuccess(res, MESSAGES.FEEDBACK.STATUS_UPDATED, { complaint });
  } catch (error) {
    next(error);
  }
};
