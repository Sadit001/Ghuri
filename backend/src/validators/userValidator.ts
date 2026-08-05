import { body } from 'express-validator';

export const updateProfileValidationRules = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty.'),
  body('contactNumber').optional().trim().notEmpty().withMessage('Contact number cannot be empty.'),
  body('gender').optional().isIn(['Male', 'Female']).withMessage('Gender must be Male or Female.'),
];

export const updatePreferencesValidationRules = [
  body('language').optional().isIn(['bn', 'en']).withMessage('Language must be "bn" or "en".'),
  body('theme').optional().isIn(['light', 'dark']).withMessage('Theme must be "light" or "dark".'),
];
