import { RepositoryError } from '../../utils/error-handling.js';
import db from '../../services/db.js';

export const getUsersRepo = async (query, attributes, include) => {
  try {
    return await db.User.findAll({
      attributes,
      include,
      offset: query.from,
      limit: query.size,
    });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const getUserByIdRepo = async (id, attributes, include) => {
  try {
    return await db.User.findOne({
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

export const getUserByEmailRepo = async (email, attributes, include) => {
  try {
    return await db.User.findOne({
      attributes,
      include,
      where: {
        email,
      },
    });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const createUserRepo = async (user) => {
  try {
    return await db.User.create(user);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const updateUserByIdRepo = async (id, user) => {
  try {
    return await db.User.update(user, { where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const deleteUserByIdRepo = async (id) => {
  try {
    return await db.User.destroy({ where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};
