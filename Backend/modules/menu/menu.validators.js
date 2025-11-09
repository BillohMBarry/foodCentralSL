import { body } from "express-validator";

export const createMenuValidator = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isFloat({min: 0}).withMessage('Price must be a number greater than or equal to 0').toFloat(),
    body('image').optional({values: "falsy"}).isURL(),
    // body('category').optional({values: "falsy", checkFalsy:true }).isString().withMessage('Category must be string').trim(),
]
export const updateMenuValidators = [
  body('name').optional().isString().trim(),
  body('description').optional().isString().trim(),
  body('price').optional().isFloat({ min: 0 }).toFloat(),
  body('image').optional({ values: 'falsy' }).isURL().withMessage('Image must be a valid URL'),
  body('category').optional().isString().trim(),
  body('isAvailable').optional().isBoolean().withMessage('isAvailable must be a boolean').toBoolean(),
];