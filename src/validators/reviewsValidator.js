import { body, validationResult } from 'express-validator';

const ReviewValidationRules = () => {
  return [
    body('shop_id').notEmpty().withMessage('Shop ID is required').isMongoId().withMessage('Shop ID must be a valid MongoDB ObjectId'),
    body('user_id').notEmpty().withMessage('User ID is required').isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
    body('rating').notEmpty().withMessage('Rating is required').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    body('comment').optional().isString().withMessage('Comment must be a string'),
    body('created_at').optional().isISO8601().withMessage('Created at must be a valid date'),
    body('updated_at').optional().isISO8601().withMessage('Updated at must be a valid date')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export {
  ReviewValidationRules,
  validate
};
