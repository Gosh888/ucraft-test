import {
  createRoomService, deleteRoomByIdService, getRoomsService, updateRoomByIdService,
} from './room.service.js';
import db from '../../services/db.js';

export const getRoomsController = async (req, res, next) => {
  try {
    const got = await getRoomsService(req.query, null, [db.User, db.UserRoom]);
    return res.send(got);
  } catch (err) {
    next(err);
  }
};

export const createRoomController = async (req, res, next) => {
  try {
    const created = await createRoomService(req.user.id, req.body);
    return res.send(created);
  } catch (err) {
    next(err);
  }
};

export const deleteRoomController = async (req, res, next) => {
  try {
    const created = await deleteRoomByIdService(req.user.id, req.params.id);
    return res.send(created);
  } catch (err) {
    next(err);
  }
};

export const updateRoomController = async (req, res, next) => {
  try {
    const created = await updateRoomByIdService(req.user.id, req.params.id, req.body);
    return res.send(created);
  } catch (err) {
    next(err);
  }
};
