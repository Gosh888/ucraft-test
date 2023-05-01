import { body } from 'express-validator';
import { validationResultMiddleware } from '../../utils/validation-result.js';
import { GENERAL_ERRORS } from '../../utils/error-messages.js';

export const signupValidator = [
  body('email').isEmail().withMessage(GENERAL_ERRORS.isEmail),
  body('firstName').notEmpty().withMessage(GENERAL_ERRORS.isRequired('firstName'))
    .isLength({ min: 2, max: 15 })
    .withMessage(GENERAL_ERRORS.fieldFromToString('firstName', 2, 15))
    .matches(/^[A-Z]/)
    .withMessage(GENERAL_ERRORS.firstLetterUppercase)
    .isAlpha()
    .withMessage(GENERAL_ERRORS.isAlpha),
  body('lastName').notEmpty().withMessage(GENERAL_ERRORS.isRequired('lastName'))
    .isLength({ min: 2, max: 15 })
    .withMessage(GENERAL_ERRORS.fieldFromToString('lastName', 2, 15))
    .matches(/^[A-Z]/)
    .withMessage(GENERAL_ERRORS.firstLetterUppercase)
    .isAlpha()
    .withMessage(GENERAL_ERRORS.isAlpha),
  body('password').notEmpty().withMessage(GENERAL_ERRORS.isRequired('Password'))
    .isString()
    .withMessage(GENERAL_ERRORS.isString)
    .isStrongPassword(),
  validationResultMiddleware,
];

export const signinValidator = [
  body('email').isEmail().withMessage(GENERAL_ERRORS.isEmail),
  body('password').notEmpty().withMessage(GENERAL_ERRORS.isRequired('Password'))
    .isString()
    .withMessage(GENERAL_ERRORS.isString)
    .isStrongPassword(),
  validationResultMiddleware,
];

export const confirmEmailValidator = [
  body('token').isJWT().withMessage(GENERAL_ERRORS.isJWT),
  validationResultMiddleware,
];

export const resendVerificationValidator = [
  body('email').isEmail().withMessage(GENERAL_ERRORS.isEmail),
  validationResultMiddleware,
];

export const forgetPasswordValidator = [
  body('email').isEmail().withMessage(GENERAL_ERRORS.isEmail),
  validationResultMiddleware,
];

export const newPasswordValidator = [
  body('token').isJWT().withMessage(GENERAL_ERRORS.isJWT),
  body('password').notEmpty().withMessage(GENERAL_ERRORS.isRequired('Password'))
    .isString()
    .withMessage(GENERAL_ERRORS.isString)
    .isStrongPassword(),
  validationResultMiddleware,
];

export const newAccessTokenValidator = [
  body('token').isJWT().withMessage(GENERAL_ERRORS.isJWT),
  validationResultMiddleware,
];
