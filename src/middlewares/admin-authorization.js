import { verifyToken } from '../services/jwt.js';
import { ValidatorError } from '../utils/error-handling.js';
import { getUserByIdOrFailService } from '../api/user/user.service.js';
import { GENERAL_ERRORS } from '../utils/error-messages.js';

export const adminAuthorization = async (req, res, next) => {
  try {
    const token = req.header('authorization').replace('Bearer ', '');

    const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET);

    const user = await getUserByIdOrFailService(decoded.id, null);

    req.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    };

    next();
  } catch (error) {
    next(new ValidatorError(GENERAL_ERRORS.unauthorized, 401));
  }
};
