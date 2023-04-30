import { validateJoi } from '../../middlewares/validation-result.js';
import { pollCreateSocketValidator, pollVoteSocketValidator } from './poll.validator.js';
import { createPollService, votePollService } from './poll.service.js';

export const pollRegister = (io, socket) => {
  socket.on('poll:create', async (payload) => {
    try {
      payload = validateJoi(pollCreateSocketValidator, payload);

      const created = await createPollService(io, socket, payload);
      return socket.emit('response', created);
    } catch (err) {
      console.log(err);
      return socket.emit('error', {
        status: err.statusCode,
        errors: err.errors,
      });
    }
  });

  socket.on('poll:vote', async (payload) => {
    try {
      payload = validateJoi(pollVoteSocketValidator, payload);

      const created = await votePollService(io, socket, payload);
      return socket.emit('response', created);
    } catch (err) {
      console.log(err);
      return socket.emit('error', {
        status: err.statusCode,
        errors: err.errors,
      });
    }
  });
};
