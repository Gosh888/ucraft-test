import { Server } from 'socket.io';
import { socketAuthorization } from './middlewares/socket-authorization.js';
import { roomRegister } from './api/room/room.register.js';
import { deleteUserRoomByIdService, getUserRoomsByUserIdService } from './api/user-room/user-room.service.js';

export const createSocket = (server) => {
  const io = new Server(server, {});
  io.use(socketAuthorization);

  io.on('connection', (socket) => {
    roomRegister(io, socket);

    socket.on('disconnect', async () => {
      const userRooms = await getUserRoomsByUserIdService(socket.user.id, ['id']);
      await Promise.all([userRooms.map((ur) => deleteUserRoomByIdService(ur.id))]);
    });
  });
};
