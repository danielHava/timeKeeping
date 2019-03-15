const bcrypt = require('bcryptjs');

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
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'manager', 'admin'],
      allowNull: false
    },
    preferredHours: {
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeCreate: function(user) {
        const salt = bcrypt.genSaltSync(8);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });

  User.prototype.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
  }

  return User;
};
