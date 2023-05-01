import express from 'express';
import authRouter from './api/auth/auth.rout.js';
import roomRouter from './api/room/room.rout.js';

export const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/room', roomRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  try {
    console.log('error___', err);
    res.status(err.statusCode);
    res.send({
      errors: err.errors,
    });
  } catch {
    res.send({
      err,
    });
  }
});
