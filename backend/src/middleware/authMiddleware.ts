import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { verifyToken } from '../utils/jwt';
import { userRepository } from '../repositories/userRepository';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.AUTH.UNAUTHORIZED,
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await userRepository.findById(decoded.uid);
    if (!user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.AUTH.INVALID_TOKEN,
      });
      return;
    }

    // Attach user to request for use in controllers
    delete (user as any).passwordHash;
    req.user = user;
    next();
  } catch (error) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.AUTH.INVALID_TOKEN,
    });
  }
};
