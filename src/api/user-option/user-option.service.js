import { ServiceError } from '../../utils/error-handling.js';
import {
  createUserOptionRepo,
  deleteUserOptionByIdRepo,
  getUserOptionByIdRepo,
  getUserOptionByIdsRepo,
  getUserOptionsByUserIdRepo,
  getUserOptionsRepo,
  updateUserOptionByIdRepo,
} from './user-option.repo.js';
import { GENERAL_ERRORS, POLL_ERRORS } from '../../utils/error-messages.js';

export const getUserOptionsService = async (query, attributes, include) => getUserOptionsRepo(query, attributes, include);

export const getUserOptionsByUserIdService = async (userId, attributes, include) => getUserOptionsByUserIdRepo(userId, attributes, include);

export const getUserOptionByIdOrFailService = async (id, attributes, include) => {
  const got = await getUserOptionByIdRepo(id, attributes, include);
  if (got == null) {
    throw new ServiceError(GENERAL_ERRORS.notFound('UserOption'), 403);
  }
  return got;
};

export const getUserOptionByIdsOrFailService = async (userId, optionId, attributes, include) => {
  const got = await getUserOptionByIdsRepo(userId, optionId, attributes, include);
  if (got == null) {
    throw new ServiceError(GENERAL_ERRORS.notFound('UserOption'), 403);
  }
  return got;
};

export const getUserOptionByIdsService = async (userId, optionId, attributes, include) => getUserOptionByIdsRepo(userId, optionId, attributes, include);

export const createUserOptionService = async (userOption) => {
  const got = await getUserOptionByIdsService(userOption.userId, userOption.optionId, ['id']);
  if (got != null) {
    throw new ServiceError(POLL_ERRORS.isVoted, 403);
  }
  return createUserOptionRepo(userOption);
};

export const updateUserOptionByIdService = async (id, userOption) => {
  await getUserOptionByIdOrFailService(id, ['id']);
  await updateUserOptionByIdRepo(id, userOption);
  return { message: 'updated' };
};

export const deleteUserOptionByIdService = async (id) => {
  await deleteUserOptionByIdRepo(id);
  return { message: 'deleted' };
};

export const deleteUserOptionByIdsService = async (userId, optionId) => {
  const got = await getUserOptionByIdsOrFailService(userId, optionId, ['id']);
  await deleteUserOptionByIdRepo(got.id);
  return { message: 'deleted' };
};
