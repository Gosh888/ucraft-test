import { verifyToken } from '../services/jwt.js';
import { ValidatorError } from '../utils/error-handling.js';
import { getUserConfirmedByIdOrFailService } from '../api/user/user.service.js';
import { GENERAL_ERRORS } from '../utils/error-messages.js';

export const clientAuthorization = async (req, res, next) => {
  try {
    const token = req.header('authorization').replace('Bearer ', '');

    const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET);

    const user = await getUserConfirmedByIdOrFailService(decoded.id);

    req.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    next();
  } catch (error) {
    next(new ValidatorError(GENERAL_ERRORS.unauthorized, 401));
  }
};
