import Joi from 'joi';
import { GENERAL_ERRORS } from '../../utils/error-messages.js';

export const pollCreateSocketValidator = Joi.object({
  roomId: Joi.number()
    .integer()
    .min(0)
    .max(2147483647)
    .required()
    .messages({
      'string.base': GENERAL_ERRORS.fieldFromToString('Room Id', 0, 2147483647),
      'any.required': GENERAL_ERRORS.isRequired('Room Id'),
    }),
  name: Joi.string()
    .required()
    .messages({
      'any.required': GENERAL_ERRORS.isRequired('Name'),
    }),
  options: Joi.array().items(Joi.string()).required().messages({
    'any.required': GENERAL_ERRORS.isRequired('Options'),
  }),
});

export const pollVoteSocketValidator = Joi.object({
  optionId: Joi.number()
    .integer()
    .min(0)
    .max(2147483647)
    .required()
    .messages({
      'string.base': GENERAL_ERRORS.fieldFromToString('Option Id', 0, 2147483647),
      'any.required': GENERAL_ERRORS.isRequired('Option Id'),
    }),

});
