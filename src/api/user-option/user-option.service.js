import { ServiceError } from '../../utils/error-handling.js';
import { createUserOptionRepo, getUserOptionByIdsRepo } from './user-option.repo.js';
import { POLL_ERRORS } from '../../utils/error-messages.js';

export const getUserOptionByIdsService = async (userId, optionId, attributes, include) => getUserOptionByIdsRepo(userId, optionId, attributes, include);

export const createUserOptionService = async (userOption) => {
  const got = await getUserOptionByIdsService(userOption.userId, userOption.optionId, ['id']);
  if (got != null) {
    throw new ServiceError(POLL_ERRORS.isVoted, 403);
  }
  return createUserOptionRepo(userOption);
};
