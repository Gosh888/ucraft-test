import { RepositoryError } from '../../utils/error-handling.js';
import db from '../../services/db.js';

export const getOptionByIdRepo = async (id, attributes, include) => {
  try {
    return await db.Option.findOne({
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

export const createOptionRepo = async (option) => {
  try {
    return await db.Option.create(option);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const deleteOptionByIdRepo = async (id) => {
  try {
    return await db.Option.destroy({ where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};
