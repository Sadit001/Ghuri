import { body } from 'express-validator';

export const createTripValidationRules = [
  body('destination').trim().notEmpty().withMessage('Destination is required.'),
  body('division').trim().notEmpty().withMessage('Division is required.'),
  body('totalDays').isInt({ min: 1 }).withMessage('Total days must be at least 1.'),
  body('adultsCount').isInt({ min: 1 }).withMessage('Adult count must be at least 1.'),
  body('budgetType').isIn(['Budget', 'Standard', 'Luxury']).withMessage('Budget type must be Budget, Standard, or Luxury.'),
];

export const calculateCostValidationRules = [
  body('destination').trim().notEmpty().withMessage('Destination is required.'),
  body('division').trim().notEmpty().withMessage('Division is required.'),
  body('days').isInt({ min: 1 }).withMessage('Days must be at least 1.'),
  body('adults').isInt({ min: 1 }).withMessage('Adults must be at least 1.'),
  body('budgetType').isIn(['Budget', 'Standard', 'Luxury']).withMessage('Budget type must be Budget, Standard, or Luxury.'),
];
