module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  return User;
};