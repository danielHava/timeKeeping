module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdBy:  {
      type: DataTypes.INTEGER,
    }
  }, {});
  return Todo;
};