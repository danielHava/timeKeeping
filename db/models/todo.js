module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdBy:  {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        as: 'createdBy',
      }
    }
  }, {});
  Todo.associate = (models) => {
    Todo.belongsTo(models.User);
  };
  return Todo;
};