import { createMessageRepo, getMessagesRepo } from './message.repo.js';

export const getMessagesService = async (query, attributes, include) => getMessagesRepo(query, attributes, include);

export const createMessageService = async (message, userId, roomId) => createMessageRepo({ message, userId, roomId });
