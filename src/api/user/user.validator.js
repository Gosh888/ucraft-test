import { body, param, query } from 'express-validator';
import { validationResultMiddleware } from '../../middlewares/validation-result.js';
import { GENERAL_ERRORS } from '../../utils/error-messages.js';

export const getAllValidator = [
  query('from').toInt().notEmpty().withMessage(GENERAL_ERRORS.isRequired('From'))
    .isInt({ min: 0, max: 2147483647 })
    .withMessage(GENERAL_ERRORS.isFromToNumber('Category Id', 0, 2147483647)),
  query('size').toInt().notEmpty()
    .withMessage(GENERAL_ERRORS.isRequired('Size'))
    .isInt({ min: 0, max: 50 })
    .withMessage(GENERAL_ERRORS.isFromToNumber('Category Id', 0, 50)),
  validationResultMiddleware,
];

export const getOneValidator = [
  param('id').toInt(),
  validationResultMiddleware,
];

export const createValidator = [
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

export const updateValidator = [
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
  validationResultMiddleware,
];

export const deleteValidator = [
  param('id').toInt(),
  validationResultMiddleware,
];
