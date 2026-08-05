import { body } from 'express-validator';

export const createBookingValidationRules = [
  body('type').isIn(['trip', 'guide', 'hotel', 'spot', 'complaint']).withMessage('Invalid booking type.'),
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('cost').isNumeric().withMessage('Cost must be a valid number.'),
];
