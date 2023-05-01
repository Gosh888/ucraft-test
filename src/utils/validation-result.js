import { matchedData, validationResult } from 'express-validator';
import { JoiError } from './error-handling.js';

export const validationResultMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ errors: errors.array() });
  }

  req.body = matchedData(req, {
    includeOptionals: true,
  });

  next();
};

export const validateJoi = (schema, payload) => {
  const { error, value } = schema.validate(payload, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new JoiError(error.details);
  }

  return value;
};
