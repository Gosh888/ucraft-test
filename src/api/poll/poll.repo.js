import { RepositoryError } from '../../utils/error-handling.js';
import db from '../../services/db.js';

export const getPollByIdRepo = async (id, attributes, include) => {
  try {
    return await db.Poll.findOne({
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

export const createPollRepo = async (poll) => {
  try {
    return await db.Poll.create(poll);
  } catch (err) {
    console.log('err', err);
    throw new RepositoryError(err.message, 500);
  }
};

export const updatePollByIdRepo = async (id, poll) => {
  try {
    return await db.Poll.update(poll, { where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const deletePollByIdRepo = async (id) => {
  try {
    return await db.Poll.destroy({ where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};
