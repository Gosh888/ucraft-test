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

export const getMessageByIdRepo = async (id, attributes, include) => {
  try {
    return await db.Message.findOne({
      attributes,
      include,
      where: {
        id,
      },
    });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const getMessageByNameRepo = async (name, attributes, include) => {
  try {
    return await db.Message.findOne({
      attributes,
      include,
      where: {
        name,
      },
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

export const updateMessageByIdRepo = async (id, message) => {
  try {
    return await db.Message.update(message, { where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const deleteMessageByIdRepo = async (id) => {
  try {
    return await db.Message.destroy({ where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};
