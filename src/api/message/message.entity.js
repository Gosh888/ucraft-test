export default (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'message',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      tableName: 'message',
    },
  );

  Message.associate = (models) => {
    models.Message.belongsTo(models.User);
  };

  return Message;
};
