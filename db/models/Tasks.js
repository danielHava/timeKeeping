module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    onGoing: {
      type: DataTypes.BOOLEAN
    },
    duration: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM,
      values: ['new', 'doing', 'done']
    },
    lastModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  return Task;
};
