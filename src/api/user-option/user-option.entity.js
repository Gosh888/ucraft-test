export default (sequelize, DataTypes) => {
  const UserOption = sequelize.define(
    'userOption',
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
      tableName: 'userOption',
      indexes: [
        {
          fields: ['userId', 'optionId'],
        },
      ],
    },
  );

  return UserOption;
};
