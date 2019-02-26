module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Todos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      onGoing: {
        type: Sequelize.BOOLEAN
      },
      duration: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values: ['new', 'doing', 'done']
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('Todos');
  }
};