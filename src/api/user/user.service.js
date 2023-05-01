import { ServiceError } from '../../utils/error-handling.js';
import {
  createUserRepo, getUserByEmailRepo, getUserByIdRepo, updateUserByIdRepo,
} from './user.repo.js';
import { hashPassword } from '../../services/bcrypt.js';
import { GENERAL_ERRORS } from '../../utils/error-messages.js';

export const getUserByIdOrFailService = async (id, attributes, include) => {
  const got = await getUserByIdRepo(id, attributes, include);
  if (got == null) {
    throw new ServiceError(GENERAL_ERRORS.notFound('User'), 403);
  }
  return got;
};

export const getUserByEmailOrFailService = async (email, attributes, include) => {
  const got = await getUserByEmailRepo(email, attributes, include);
  if (got == null) {
    throw new ServiceError(GENERAL_ERRORS.notFound('User'), 403);
  }
  return got;
};

export const getUserByEmailService = async (email, attributes, include) => getUserByEmailRepo(email, attributes, include);

export const createUserService = async (user) => {
  const got = await getUserByEmailService(user.email, ['id']);

  if (got != null) {
    throw new ServiceError(GENERAL_ERRORS.isExists('Email'), 403);
  }
  const password = hashPassword(user.password);

  return createUserRepo({
    ...user,
    password,
  });
};

export const updateUserByIdService = async (id, user) => {
  await getUserByIdOrFailService(id, ['id']);
  await updateUserByIdRepo(id, user);
  return { message: 'updated' };
};
