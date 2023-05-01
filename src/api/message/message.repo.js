import { RepositoryError } from '../../utils/error-handling.js';
import db from '../../services/db.js';

export const getMessagesRepo = async (query, attributes, include) => {
  try {
    return await db.Message.findAll({
      attributes,
      include,
      offset: query.from,
      limit: query.size,
    });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const createMessageRepo = async (message) => {
  try {
    return await db.Message.create(message);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};
