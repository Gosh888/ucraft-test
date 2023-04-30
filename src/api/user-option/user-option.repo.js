import { RepositoryError } from '../../utils/error-handling.js';
import db from '../../services/db.js';

export const getUserOptionsRepo = async (query, attributes, include) => {
  try {
    return await db.UserOption.findAll({
      attributes,
      include,
      offset: query.from,
      limit: query.size,
    });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const getUserOptionByIdRepo = async (id, attributes, include) => {
  try {
    return await db.UserOption.findOne({
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

export const getUserOptionsByUserIdRepo = async (userId, attributes, include) => {
  try {
    return await db.UserOption.findAll({
      attributes,
      include,
      where: {
        userId,
      },
    });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const getUserOptionByIdsRepo = async (userId, optionId, attributes, include) => {
  try {
    return await db.UserOption.findOne({
      attributes,
      include,
      where: {
        userId,
        optionId,
      },
    });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const createUserOptionRepo = async (userOption) => {
  try {
    return await db.UserOption.create(userOption);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const updateUserOptionByIdRepo = async (id, userOption) => {
  try {
    return await db.UserOption.update(userOption, { where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const deleteUserOptionByIdRepo = async (id) => {
  try {
    return await db.UserOption.destroy({ where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};
