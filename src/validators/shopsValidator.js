import { body, validationResult } from 'express-validator';

const ShopValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('location.latitude').notEmpty().withMessage('Latitude is required').isFloat().withMessage('Latitude must be a valid number'),
    body('location.longitude').notEmpty().withMessage('Longitude is required').isFloat().withMessage('Longitude must be a valid number'),
    body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    body('rating_number').optional().isNumeric().withMessage('Rating number must be a valid number'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('images').optional().isArray().withMessage('Images must be an array'),
    body('images.*').optional().isString().withMessage('Each image must be a string'),
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
  ShopValidationRules,
  validate
};
