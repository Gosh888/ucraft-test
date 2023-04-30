import { ServiceError } from '../../utils/error-handling.js';
import {
  createRoomRepo,
  deleteRoomByIdRepo,
  getRoomByNameRepo,
  getRoomByIdRepo,
  getRoomsRepo,
  updateRoomByIdRepo,
} from './room.repo.js';
import { GENERAL_ERRORS, ROOM_ERRORS } from '../../utils/error-messages.js';
import { createMessageService } from '../message/message.service.js';
import {
  createUserRoomService,
  deleteUserRoomByIdsService,
  getUserRoomByIdsOrFailService,
} from '../user-room/user-room.service.js';

export const getRoomsService = async (query, attributes, include) => getRoomsRepo(query, attributes, include);

export const getRoomByIdOrFailService = async (id, attributes, include) => {
  const got = await getRoomByIdRepo(id, attributes, include);
  if (got == null) {
    throw new ServiceError(GENERAL_ERRORS.notFound('Room'), 403);
  }
  return got;
};

export const getRoomByNameOrFailService = async (name, attributes, include) => {
  const got = await getRoomByNameRepo(name, attributes, include);
  if (got == null) {
    throw new ServiceError(GENERAL_ERRORS.notFound('Room'), 403);
  }
  return got;
};

export const getRoomByNameService = async (name, attributes, include) => getRoomByNameRepo(name, attributes, include);

export const createRoomService = async (userId, room) => {
  const got = await getRoomByNameService(room.name, ['id']);

  if (got != null) {
    throw new ServiceError(GENERAL_ERRORS.isExists('Name'), 403);
  }

  return createRoomRepo({ creatorId: userId, ...room });
};

export const updateRoomByIdService = async (id, room) => {
  await getRoomByIdOrFailService(id, ['id']);
  await updateRoomByIdRepo(id, room);
  return { message: 'updated' };
};

export const deleteRoomByIdService = async (userId, id) => {
  const got = await getRoomByIdOrFailService(id, ['ownerId']);
  if (got.ownerId !== userId) {
    throw new ServiceError(ROOM_ERRORS.isOwnerDeleteRoom, 403);
  }
  await deleteRoomByIdRepo(id);
  return { message: 'deleted' };
};

export const joinRoomByIdService = async (socket, id) => {
  await getRoomByIdOrFailService(id, ['id']);
  await createUserRoomService({ userId: socket.user.id, roomId: id });
  socket.join(`room:${id}`);
  socket.broadcast.to(`room:${id}`).emit('room:inform', `${socket.user.firstName} join to room`);
  return { message: 'joined' };
};

export const leaveRoomByIdService = async (socket, id) => {
  await getRoomByIdOrFailService(id, ['id']);
  await deleteUserRoomByIdsService(socket.user.id, id);
  socket.leave(`room:${id}`);
  socket.broadcast.to(`room:${id}`).emit('room:inform', `${socket.user.firstName} leave the room`);
  return { message: 'leaved' };
};

export const messageRoomByIdService = async (socket, message, id) => {
  await Promise.all([
    getRoomByIdOrFailService(id, ['id']),
    getUserRoomByIdsOrFailService(socket.user.id, id, ['id'])]);

  await createMessageService(message, socket.user.id, id);
  socket.in(`room:${id}`).emit('room:messaged', { user: socket.user, message });
  return { message: 'messaged' };
};
