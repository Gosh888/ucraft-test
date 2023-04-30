import { RepositoryError } from '../../utils/error-handling.js';
import db from '../../services/db.js';

export const getUserRoomsRepo = async (query, attributes, include) => {
  try {
    return await db.UserRoom.findAll({
      attributes,
      include,
      offset: query.from,
      limit: query.size,
    });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const getUserRoomByIdRepo = async (id, attributes, include) => {
  try {
    return await db.UserRoom.findOne({
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

export const getUserRoomsByUserIdRepo = async (userId, attributes, include) => {
  try {
    return await db.UserRoom.findAll({
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

export const getUserRoomByIdsRepo = async (userId, roomId, attributes, include) => {
  try {
    return await db.UserRoom.findOne({
      attributes,
      include,
      where: {
        userId,
        roomId,
      },
    });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const createUserRoomRepo = async (userRoom) => {
  try {
    return await db.UserRoom.create(userRoom);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const updateUserRoomByIdRepo = async (id, userRoom) => {
  try {
    return await db.UserRoom.update(userRoom, { where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const deleteUserRoomByIdRepo = async (id) => {
  try {
    return await db.UserRoom.destroy({ where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};
