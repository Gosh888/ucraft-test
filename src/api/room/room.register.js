import { joinRoomByIdService, leaveRoomByIdService, messageRoomByIdService } from './room.service.js';
import { validateJoi } from '../../utils/validation-result.js';
import { roomJoinSocketValidator, roomMessageSocketValidator } from './room.validator.js';

export const roomRegister = (io, socket) => {
  socket.on('room:join', async (payload) => {
    try {
      const { roomId } = validateJoi(roomJoinSocketValidator, payload);

      return await joinRoomByIdService(io, socket, roomId);
    } catch (err) {
      console.log(err);
      return socket.emit('error', {
        status: err.statusCode,
        errors: err.errors,
      });
    }
  });

  socket.on('room:leave', async (payload) => {
    try {
      const { roomId } = validateJoi(roomJoinSocketValidator, payload);

      return await leaveRoomByIdService(io, socket, roomId);
    } catch (err) {
      console.log(err);
      return socket.emit('error', {
        status: err.statusCode,
        errors: err.errors,
      });
    }
  });

  socket.on('room:message', async (payload) => {
    try {
      const { message, roomId } = validateJoi(roomMessageSocketValidator, payload);
      return await messageRoomByIdService(io, socket, message, roomId);
    } catch (err) {
      console.log(err);
      return socket.emit('error', {
        status: err.statusCode,
        errors: err.errors,
      });
    }
  });
};
