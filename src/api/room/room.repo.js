import { RepositoryError } from '../../utils/error-handling.js';
import db from '../../services/db.js';

export const getRoomsRepo = async (query, attributes, include) => {
  try {
    return await db.Room.findAll({
      attributes,
      include,
      offset: query.from,
      limit: query.size,
    });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const getRoomByIdRepo = async (id, attributes, include) => {
  try {
    return await db.Room.findOne({
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

export const getRoomByNameRepo = async (name, attributes, include) => {
  try {
    return await db.Room.findOne({
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

export const createRoomRepo = async (room) => {
  try {
    return await db.Room.create(room);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const updateRoomByIdRepo = async (id, room) => {
  try {
    return await db.Room.update(room, { where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const deleteRoomByIdRepo = async (id) => {
  try {
    return await db.Room.destroy({ where: { id } });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};
