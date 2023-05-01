import { Router } from 'express';
import {
  createValidator, deleteValidator, getAllValidator, updateValidator,
} from './room.validator.js';
import {
  createRoomController,
  deleteRoomController,
  getRoomsController,
  updateRoomController,
} from './room.controller.js';
import { clientAuthorization } from '../../middlewares/client-authorization.js';

const router = Router();

router.get('/', clientAuthorization, ...getAllValidator, getRoomsController);
router.post('/', clientAuthorization, ...createValidator, createRoomController);
router.put('/:id', clientAuthorization, ...updateValidator, updateRoomController);
router.delete('/:id', clientAuthorization, ...deleteValidator, deleteRoomController);

export default router;
