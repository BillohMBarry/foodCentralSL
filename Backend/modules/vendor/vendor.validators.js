import { body } from "express-validator";

export const createVendorValidator = [
  body('restaurantName').trim().notEmpty().withMessage('restaurantName is required'),
  // body('restaurantEmail')
  //   .trim()
  //   .isEmail().withMessage('Valid restaurantEmail is required')
  //   .normalizeEmail()
  //   .toLowerCase(),
  body('restaurantPhoneNum').trim().notEmpty().withMessage('restaurantPhoneNum is required'),
  body('restaurantLogo').optional({ checkFalsy:true }).trim().isURL().withMessage('restaurantLogo must be a valid URL'),
  body('restaurantAddress').trim().notEmpty().withMessage('restaurantAddress is required'),
  // body('restaurantLocation').optional().trim(),
  body('restaurantPhoneNum')
  .trim()
  .matches(/^[+0-9\s()-]{6,20}$/).withMessage('Invalid phone number'),
];

export const updateVendorValidators = [
  body('restaurantName').optional().isString().trim(),
  body('restaurantEmail').optional({ values: 'falsy' }).isEmail().normalizeEmail().toLowerCase(),
  body('restaurantPhoneNum').optional().isString().trim(),
  body('restaurantLogo').optional({ checkFalsy: true }).isURL().withMessage('restaurantLogo must be a valid URL'),
  body('restaurantAddress').optional().isString().trim(),
  body('restaurantLocation').optional().isString().trim(),
  // body('qrColor').optional().isString().trim(),
  // body('qrLogoUrl').optional({ values: 'falsy' }).isURL(),
  // body('menuUrl').optional({ values: 'falsy' }).isURL(),
  // body('qrCodeUrl').optional({ values: 'falsy' }).isURL(),
  // body('isActive').optional().isBoolean().toBoolean(),
  // body('paymentMethods').optional().isArray(),
  // body('paymentMethods.*').optional().isIn(['cash', 'credit_card', 'mobile_money', 'paypal']),
  // body('businessHours').optional().isArray(),
  // body('businessHours.*.day').optional().isString().trim(),
  // body('businessHours.*.open').optional().isString().trim(),
  // body('businessHours.*.close').optional().isString().trim(),
];
