export default (sequelize, DataTypes) => {
  const Option = sequelize.define(
    'option',
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
      tableName: 'option',
    },
  );

  Option.associate = (models) => {
    models.Option.hasMany(models.UserOption);
  };

  return Option;
};
