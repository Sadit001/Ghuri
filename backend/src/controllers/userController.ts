import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { MESSAGES } from '../constants/messages';
import { userService } from '../services/userService';
import { sendSuccess } from '../utils/apiResponse';

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.getProfile(req.user!.uid);
    sendSuccess(res, MESSAGES.USER.PROFILE_FETCHED, { user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.updateProfile(req.user!.uid, req.body);
    sendSuccess(res, MESSAGES.USER.PROFILE_UPDATED, { user });
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No image file provided.' });
      return;
    }
    const avatarPath = `/uploads/${req.file.filename}`;
    const user = await userService.updateAvatar(req.user!.uid, avatarPath);
    sendSuccess(res, MESSAGES.USER.AVATAR_UPLOADED, { user, avatarPath });
  } catch (error) {
    next(error);
  }
};

export const uploadDocuments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const frontFile = files?.['documentFront']?.[0];
    const backFile = files?.['documentBack']?.[0];

    if (!frontFile) {
      res.status(400).json({ success: false, message: 'Document front image is required.' });
      return;
    }

    const frontPath = `/uploads/${frontFile.filename}`;
    const backPath = backFile ? `/uploads/${backFile.filename}` : '';
    const docType = req.body.documentType as 'NID' | 'Passport' | undefined;

    const user = await userService.updateDocuments(req.user!.uid, frontPath, backPath, docType);
    sendSuccess(res, MESSAGES.USER.DOCUMENTS_UPLOADED, { user, frontPath, backPath });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await userService.getStatsAndBadges(req.user!.uid);
    sendSuccess(res, MESSAGES.USER.STATS_FETCHED, data);
  } catch (error) {
    next(error);
  }
};

export const getPreferences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.getProfile(req.user!.uid);
    sendSuccess(res, 'Preferences retrieved.', {
      language: user.language || 'en',
      theme: user.theme || 'light',
    });
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.updatePreferences(req.user!.uid, req.body);
    sendSuccess(res, MESSAGES.USER.PREFERENCES_UPDATED, { user });
  } catch (error) {
    next(error);
  }
};
