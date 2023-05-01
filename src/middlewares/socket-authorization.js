import { verifyToken } from '../services/jwt.js';
import { ValidatorError } from '../utils/error-handling.js';
import { GENERAL_ERRORS } from '../utils/error-messages.js';
import { getUserConfirmedByIdOrFailService } from '../api/user/user.service.js';

export const socketAuthorization = async (socket, next) => {
  try {
    const token = socket.handshake.headers.authorization;

    const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET);

    const user = await getUserConfirmedByIdOrFailService(decoded.id);

    socket.user = {
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
