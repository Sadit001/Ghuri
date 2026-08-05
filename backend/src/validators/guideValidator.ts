import { body } from 'express-validator';

export const bookGuideValidationRules = [
  body('guideId').trim().notEmpty().withMessage('Guide ID is required.'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date (YYYY-MM-DD).'),
  body('endDate').isISO8601().withMessage('End date must be a valid date (YYYY-MM-DD).'),
];

export const checkAvailabilityValidationRules = [
  body('guideId').trim().notEmpty().withMessage('Guide ID is required.'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date.'),
  body('endDate').isISO8601().withMessage('End date must be a valid date.'),
];

export const submitReviewValidationRules = [
  body('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5.'),
  body('text').trim().notEmpty().withMessage('Review text is required.'),
];
