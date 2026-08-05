import { body } from 'express-validator';

export const registerValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('contactNumber').trim().notEmpty().withMessage('Contact number is required.'),
  body('gender').isIn(['Male', 'Female']).withMessage('Gender must be Male or Female.'),
];

export const loginValidationRules = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address.'),
  body('password').notEmpty().withMessage('Password is required.'),
];
