import { RepositoryError } from '../../utils/error-handling.js';
import db from '../../services/db.js';

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
