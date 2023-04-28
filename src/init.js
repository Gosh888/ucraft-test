import db from './services/db.js';
import { dbRedisConfig } from './services/redis.js';

const postgresInit = async () => {
  try {
    await db.sequelize.authenticate();
  } catch (err) {
    console.log('DB error___', err);
  }
};
const redisInit = async () => {
  try {
    await dbRedisConfig();
  } catch (err) {
    console.log('redis error___', err);
  }
};

export const initProject = async () => {
  await Promise.all([
    postgresInit(),
    redisInit()]);

  console.log('Project is ready');
};
