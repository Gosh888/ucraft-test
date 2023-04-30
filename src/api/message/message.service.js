import { ServiceError } from '../../utils/error-handling.js';
import {
  createMessageRepo,
  deleteMessageByIdRepo,
  getMessageByNameRepo,
  getMessageByIdRepo,
  getMessagesRepo,
  updateMessageByIdRepo,
} from './message.repo.js';
import { GENERAL_ERRORS } from '../../utils/error-messages.js';

export const getMessagesService = async (query, attributes, include) => getMessagesRepo(query, attributes, include);

export const getMessageByIdOrFailService = async (id, attributes, include) => {
  const got = await getMessageByIdRepo(id, attributes, include);
  if (got == null) {
    throw new ServiceError(GENERAL_ERRORS.notFound('Message'), 403);
  }
  return got;
};

export const getMessageByNameOrFailService = async (name, attributes, include) => {
  const got = await getMessageByNameRepo(name, attributes, include);
  if (got == null) {
    throw new ServiceError(GENERAL_ERRORS.notFound('Message'), 403);
  }
  return got;
};

export const getMessageByNameService = async (name, attributes, include) => getMessageByNameRepo(name, attributes, include);

export const createMessageService = async (message, userId, roomId) => createMessageRepo({ message, userId, roomId });

export const updateMessageByIdService = async (id, message) => {
  await getMessageByIdOrFailService(id, ['id']);
  await updateMessageByIdRepo(id, message);
  return { message: 'updated' };
};

export const deleteMessageByIdService = async (id) => {
  await getMessageByIdOrFailService(id, ['id']);
  await deleteMessageByIdRepo(id);
  return { message: 'deleted' };
};
