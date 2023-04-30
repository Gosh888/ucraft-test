export default (sequelize, DataTypes) => {
  const UserRoom = sequelize.define(
    'userRoom',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      tableName: 'userRoom',
      indexes: [
        {
          fields: ['userId', 'roomId'],
        },
      ],
    },
  );

  return UserRoom;
};
