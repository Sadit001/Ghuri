import { body } from 'express-validator';

export const submitFeedbackValidationRules = [
  body('category')
    .isIn(['General', 'Bug', 'Feature Request', 'App Experience'])
    .withMessage('Category must be General, Bug, Feature Request, or App Experience.'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters.'),
];

export const submitComplaintValidationRules = [
  body('subject').trim().notEmpty().withMessage('Subject is required.'),
  body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters.'),
];
