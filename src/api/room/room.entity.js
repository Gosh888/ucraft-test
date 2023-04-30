export default (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'room',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      tableName: 'room',
      indexes: [
        {
          unique: true,
          fields: ['name'],
        },
      ],
    },
  );

  Room.associate = (models) => {
    models.Room.belongsTo(models.User, { foreignKey: 'ownerId' });
    models.Room.hasMany(models.Message);
    models.Room.hasMany(models.UserRoom);
  };

  return Room;
};
