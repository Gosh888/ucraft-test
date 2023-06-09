import { ServiceError } from '../../utils/error-handling.js';
import {
  createUserRoomRepo,
  deleteUserRoomByIdRepo,
  getUserRoomByIdsRepo,
  getUserRoomsByUserIdRepo,
} from './user-room.repo.js';
import { GENERAL_ERRORS, ROOM_ERRORS } from '../../utils/error-messages.js';

export const getUserRoomsByUserIdService = async (userId, attributes, include) => getUserRoomsByUserIdRepo(userId, attributes, include);

export const getUserRoomByIdsOrFailService = async (userId, roomId, attributes, include) => {
  const got = await getUserRoomByIdsRepo(userId, roomId, attributes, include);
  if (got == null) {
    throw new ServiceError(GENERAL_ERRORS.notFound('UserRoom'), 403);
  }
  return got;
};

export const getUserRoomByIdsService = async (userId, roomId, attributes, include) => getUserRoomByIdsRepo(userId, roomId, attributes, include);

export const createUserRoomService = async (userRoom) => {
  const got = await getUserRoomByIdsService(userRoom.userId, userRoom.roomId, ['id']);
  if (got != null) {
    throw new ServiceError(ROOM_ERRORS.isJoined, 403);
  }
  return createUserRoomRepo(userRoom);
};

export const deleteUserRoomByIdService = async (id) => {
  await deleteUserRoomByIdRepo(id);
  return { message: 'deleted' };
};

export const deleteUserRoomByIdsService = async (userId, roomId) => {
  const got = await getUserRoomByIdsOrFailService(userId, roomId, ['id']);
  await deleteUserRoomByIdRepo(got.id);
  return { message: 'deleted' };
};
