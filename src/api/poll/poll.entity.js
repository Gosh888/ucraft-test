export default (sequelize, DataTypes) => {
  const Poll = sequelize.define(
    'poll',
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
      tableName: 'poll',
    },
  );

  Poll.associate = (models) => {
    models.Poll.belongsTo(models.User, { foreignKey: 'ownerId' });
    models.Poll.belongsTo(models.Room);
    models.Poll.hasMany(models.Option);
  };

  return Poll;
};
