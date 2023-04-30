import { ServiceError } from '../../utils/error-handling.js';
import {
  createUserService,
  getUserByEmailOrFailService,
  getUserByEmailService,
  updateUserByIdService,
} from '../user/user.service.js';
import { sendEmail } from '../../services/node-mailer.js';
import { comparePassword, hashPassword } from '../../services/bcrypt.js';
import { signToken, verifyToken } from '../../services/jwt.js';
import { GENERAL_ERRORS, USER_ERRORS } from '../../utils/error-messages.js';

export const signupService = async (body) => {
  try {
    const user = await createUserService(body);
    const jwt = signToken({ id: user.id }, '15m', process.env.JWT_ACCESS_SECRET);
    const message = `Please verify your account click by ${process.env.FRONT_URL}/confirmation/${jwt}`;
    await sendEmail(body.email, 'SignUp verification', message);

    return user;
  } catch (err) {
    throw new ServiceError(err.message, 403);
  }
};

export const signinService = async (body) => {
  const user = await getUserByEmailService(body.email, ['id', 'isConfirmed', 'password']);

  if (user == null) {
    throw new ServiceError(GENERAL_ERRORS.unauthorized, 401);
  }
  if (!user.isConfirmed) {
    throw new ServiceError(USER_ERRORS.emailNotConfirmed, 401);
  }
  if (!(await comparePassword(body.password, user.password))) {
    throw new ServiceError(GENERAL_ERRORS.unauthorized, 401);
  }
  const accessToken = signToken({ id: user.id }, process.env.JWT_ACCESS_TIME, process.env.JWT_ACCESS_SECRET);
  const refreshToken = signToken({ id: user.id }, process.env.JWT_REFRESH_TIME, process.env.JWT_REFRESH_SECRET);
  await global.redisClient.set(String(user.id), JSON.stringify({ refreshToken }));
  return {
    accessToken,
    refreshToken,
  };
};

export const newAccessTokenService = async (body) => {
  let decoded;
  try {
    decoded = verifyToken(body.token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new ServiceError(GENERAL_ERRORS.isJWT, 401);
  }

  const redisUser = JSON.parse(await global.redisClient.get(String(decoded.id)));
  if (redisUser.refreshToken !== body.token) {
    throw new ServiceError(GENERAL_ERRORS.isJWT, 401);
  }
  const accessToken = signToken({ id: decoded.id }, process.env.JWT_ACCESS_TIME, process.env.JWT_ACCESS_SECRET);
  const refreshToken = signToken({ id: decoded.id }, process.env.JWT_REFRESH_TIME, process.env.JWT_REFRESH_SECRET);
  await global.redisClient.set(String(decoded.id), JSON.stringify({ refreshToken }));
  return {
    accessToken,
    refreshToken,
  };
};

export const confirmService = async (body) => {
  let decoded;
  try {
    decoded = verifyToken(body.token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    throw new ServiceError(GENERAL_ERRORS.isJWT, 401);
  }

  await updateUserByIdService(decoded.id, { isConfirmed: true });

  return { message: 'confirm' };
};

export const resendVerificationService = async (body) => {
  const user = await getUserByEmailOrFailService(body.email, ['id']);
  const jwt = signToken({ id: user.id }, '15m', process.env.JWT_ACCESS_SECRET);
  const message = `Please verify your account click by ${process.env.FRONT_URL}/confirmation/${jwt}`;
  await sendEmail(body.email, 'SignUp verification', message);

  return { message: 'resend' };
};

export const forgetPasswordService = async (body) => {
  const user = await getUserByEmailOrFailService(body.email, ['id']);
  const jwt = signToken({ id: user.id }, '15m', process.env.JWT_ACCESS_SECRET);
  const message = `Please verify your account click by ${process.env.FRONT_URL}/forget-password/${jwt}`;
  await sendEmail(body.email, 'SignUp verification', message);

  return { message: 'send email' };
};

export const newPasswordService = async (body) => {
  let decoded;
  try {
    decoded = verifyToken(body.token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    throw new ServiceError(GENERAL_ERRORS.isJWT, 401);
  }

  await updateUserByIdService(decoded.id, { password: hashPassword(body.password) });

  return { message: 'reassign password' };
};
