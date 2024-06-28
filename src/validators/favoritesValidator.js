import { body, validationResult } from 'express-validator';

const FavoriteValidationRules = () => {
  return [
    body('user_id').notEmpty().withMessage('User ID is required').isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
    body('shop_id').notEmpty().withMessage('Shop ID is required').isMongoId().withMessage('Shop ID must be a valid MongoDB ObjectId')
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
  FavoriteValidationRules,
  validate
};
