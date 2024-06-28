import { body, validationResult } from 'express-validator';

const ProductValidationRules = () => {
  return [
    body('shop_id').notEmpty().withMessage('Shop ID is required').isMongoId().withMessage('Shop ID must be a valid MongoDB ObjectId'),
    body('name').notEmpty().withMessage('Name is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('price').notEmpty().withMessage('Price is required').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('image_url').optional().isString().withMessage('Image URL must be a string'),
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
  ProductValidationRules,
  validate
};
