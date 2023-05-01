import { ServiceError } from '../../utils/error-handling.js';
import { createPollRepo, getPollByIdRepo } from './poll.repo.js';
import { GENERAL_ERRORS } from '../../utils/error-messages.js';
import { createOptionService, getOptionByIdOrFailService } from '../option/option.service.js';
import { createUserOptionService } from '../user-option/user-option.service.js';
import db from '../../services/db.js';
import { getUserRoomByIdsOrFailService } from '../user-room/user-room.service.js';

export const getPollByIdOrFailService = async (id, attributes, include) => {
  const got = await getPollByIdRepo(id, attributes, include);
  if (got == null) {
    throw new ServiceError(GENERAL_ERRORS.notFound('Poll'), 403);
  }
  return got;
};

export const createPollService = async (io, socket, payload) => {
  const { options, ...rest } = payload;
  await getUserRoomByIdsOrFailService(socket.user.id, rest.roomId, ['id']);

  const createdPoll = await createPollRepo({ ...rest, ownerId: socket.user.id });

  const createdOptions = await Promise.all(options.map((o) =>
    createOptionService({ name: o, pollId: createdPoll.id })));

  io.sockets.in(`room:${payload.roomId}`)
    .emit('room:messaged', { user: socket.user, poll: { ...createdPoll.dataValues, option: createdOptions } });

  return { message: 'polled' };
};

export const votePollService = async (io, socket, payload) => {
  const { optionId } = payload;
  const gotVote = await getOptionByIdOrFailService(optionId, ['id', 'pollId'], [{
    model: db.Poll,
    attributes: ['roomId'],
  }]);
  await getUserRoomByIdsOrFailService(socket.user.id, gotVote.poll.roomId, ['id']);
  await createUserOptionService({ userId: socket.user.id, optionId });
  const gotPull = await getPollByIdOrFailService(gotVote.pollId, null, [{
    model: db.Option,
    include: [{
      model: db.UserOption,
    }],
  }]);
  io.sockets.in(`room:${gotPull.roomId}`)
    .emit('room:messaged', { user: socket.user, poll: gotPull });

  return { message: 'voted' };
};
