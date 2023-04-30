import { Router } from 'express';
import { createValidator, deleteValidator, getAllValidator } from './room.validator.js';
import { createRoomController, deleteRoomController, getRoomsController } from './room.controller.js';
import { clientAuthorization } from '../../middlewares/client-authorization.js';

const router = Router();

router.get('/', clientAuthorization, ...getAllValidator, getRoomsController);
router.post('/', clientAuthorization, ...createValidator, createRoomController);
router.delete('/:id', clientAuthorization, ...deleteValidator, deleteRoomController);

export default router;
