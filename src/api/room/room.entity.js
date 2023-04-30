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
      hooks: {
        afterDestroy(instance, options) {
          console.log('instance', instance);
          // instance.getProduct().then((product) => product.destroy()); // Softdelete on product table
          // console.log('after destroy: destroyed');
        },
      },
    },
  );

  Room.associate = (models) => {
    models.Room.belongsTo(models.User, { foreignKey: 'ownerId' });
    models.Room.hasMany(models.Message);
    models.Room.hasMany(models.UserRoom);
  };

  return Room;
};
