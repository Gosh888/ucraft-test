import { ServiceError } from '../../utils/error-handling.js';
import {
  createOptionRepo,
  deleteOptionByIdRepo,
  getOptionByIdRepo,
} from './option.repo.js';
import { GENERAL_ERRORS } from '../../utils/error-messages.js';

export const getOptionByIdOrFailService = async (id, attributes, include) => {
  const got = await getOptionByIdRepo(id, attributes, include);
  if (got == null) {
    throw new ServiceError(GENERAL_ERRORS.notFound('Option'), 403);
  }
  return got;
};

export const createOptionService = async (option) => createOptionRepo(option);

export const deleteOptionByIdService = async (id) => {
  await getOptionByIdOrFailService(id, ['ownerId']);
  await deleteOptionByIdRepo(id);
  return { message: 'deleted' };
};
