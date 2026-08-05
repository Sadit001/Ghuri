import { Response } from 'express';
import { HTTP_STATUS } from '../constants/statusCodes';
import { ApiResponse } from '../types/api';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T
): Response => {
  const responsePayload: ApiResponse<T> = {
    success,
    message,
    ...(data !== undefined && { data }),
  };
  return res.status(statusCode).json(responsePayload);
};

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = HTTP_STATUS.OK
): Response => {
  return sendResponse(res, statusCode, true, message, data);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = HTTP_STATUS.BAD_REQUEST,
  error?: any
): Response => {
  const responsePayload: ApiResponse = {
    success: false,
    message,
    ...(error !== undefined && { error }),
  };
  return res.status(statusCode).json(responsePayload);
};
