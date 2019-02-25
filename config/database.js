module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgresql'
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgresql'
  },
  production: {
    username: 'DB_USERNAME',
    password: 'DB_PASSWORD',
    database: 'DB_NAME',
    host: 'DB_HOSTNAME',
    dialect: 'postgresql',
  }
};
