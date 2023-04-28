import { ServiceError } from '../../utils/error-handling.js';
import {
  createUserRepo,
  deleteUserByIdRepo,
  getUserByEmailRepo,
  getUserByIdRepo,
  getUsersRepo,
  updateUserByIdRepo,
} from './user.repo.js';
import { hashPassword } from '../../services/bcrypt.js';
import { GENERAL_ERRORS } from '../../utils/error-messages.js';

export const getUsersService = async (query, attributes, include) => getUsersRepo(query, attributes, include);

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
  await getUserByIdOrFailService(id, null);
  await updateUserByIdRepo(id, user);
  return { message: 'updated' };
};

export const deleteUserByIdService = async (id) => {
  await getUserByIdOrFailService(id, null);
  await deleteUserByIdRepo(id);
  return { message: 'deleted' };
};
