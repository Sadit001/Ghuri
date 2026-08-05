import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { authService } from '../services/authService';
import { sendSuccess } from '../utils/apiResponse';
import { UserLoginDto, UserRegistrationDto } from '../types/user';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const dto: UserRegistrationDto = req.body;
    const { user, token } = await authService.register(dto);
    sendSuccess(res, MESSAGES.AUTH.REGISTER_SUCCESS, { user, token }, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const dto: UserLoginDto = req.body;
    const { user, token } = await authService.login(dto);
    sendSuccess(res, MESSAGES.AUTH.LOGIN_SUCCESS, { user, token });
  } catch (error) {
    next(error);
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  // JWT is stateless; logout handled client-side. Server acknowledges.
  sendSuccess(res, MESSAGES.AUTH.LOGOUT_SUCCESS);
};

export const me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const uid = req.user!.uid;
    const user = await authService.validateSession(uid);
    sendSuccess(res, MESSAGES.USER.PROFILE_FETCHED, { user });
  } catch (error) {
    next(error);
  }
};
