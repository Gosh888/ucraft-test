import { joinRoomByIdService, leaveRoomByIdService, messageRoomByIdService } from './room.service.js';
import { validateJoi } from '../../middlewares/validation-result.js';
import { roomJoinSocketValidator, roomMessageSocketValidator } from './room.validator.js';

export const roomRegister = (io, socket) => {
  socket.on('room:join', async (payload) => {
    try {
      const { roomId } = validateJoi(roomJoinSocketValidator, payload);

      const joined = await joinRoomByIdService(io, socket, roomId);
      return socket.emit('response', joined);
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

      const joined = await leaveRoomByIdService(io, socket, roomId);
      return socket.emit('response', joined);
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
      const messaged = await messageRoomByIdService(io, socket, message, roomId);
      return socket.emit('response', messaged);
    } catch (err) {
      console.log(err);
      return socket.emit('error', {
        status: err.statusCode,
        errors: err.errors,
      });
    }
  });
};
