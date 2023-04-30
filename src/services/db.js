import Sequelize from 'sequelize';

import user from '../api/user/user.entity.js';
import room from '../api/room/room.entity.js';
import message from '../api/message/message.entity.js';
import userRoom from '../api/user-room/user-room.entity.js';

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
});

const db = {};

db.User = user(sequelize, Sequelize);
db.Room = room(sequelize, Sequelize);
db.Message = message(sequelize, Sequelize);
db.UserRoom = userRoom(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

await sequelize.sync({ force: false, alter: true });
// await sequelize.sync({ force: true });

export default db;
