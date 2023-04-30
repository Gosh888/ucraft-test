import { body, param, query } from 'express-validator';
import Joi from 'joi';
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

export const createValidator = [
  body('name').notEmpty().withMessage(GENERAL_ERRORS.isRequired('Name'))
    .isLength({ min: 2, max: 15 })
    .withMessage(GENERAL_ERRORS.fieldFromToString('Name', 2, 15))
    .matches(/^[A-Z]/)
    .withMessage(GENERAL_ERRORS.firstLetterUppercase),
  validationResultMiddleware,
];

export const deleteValidator = [
  param('id').toInt(),
  validationResultMiddleware,
];

export const roomJoinSocketValidator = Joi.object({
  roomId: Joi.number()
    .integer()
    .min(0)
    .max(2147483647)
    .required()
    .messages({
      'string.base': GENERAL_ERRORS.fieldFromToString('Room Id', 0, 2147483647),
      'any.required': GENERAL_ERRORS.isRequired('Room Id'),
    }),
});

export const roomMessageSocketValidator = Joi.object({
  roomId: Joi.number()
    .integer()
    .min(0)
    .max(2147483647)
    .required()
    .messages({
      'number.base': GENERAL_ERRORS.fieldFromToString('Room Id', 0, 2147483647),
      'any.required': GENERAL_ERRORS.isRequired('Room Id'),
    }),
  message: Joi.string()
    .required()
    .messages({
      'any.required': GENERAL_ERRORS.isRequired('Message'),
    }),
});
