require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const notFound = require('./middleware/errorHandler').notFound;
const methodNotAllowed = require('./middleware/errorHandler').methodNotAllowed;

const tasksRoute = require('./routes').tasksRoute;
const usersRoute = require('./routes').usersRoute;
const authRoute = require('./routes').authRoute;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  // customJs: './customize_swagger.js'
};
 
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error Middlewares
app.use(notFound);
app.use(methodNotAllowed);

app.use('/api/v1/docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/api/v1/tasks/', tasksRoute);
app.use('/api/v1/users/', usersRoute);
app.use('/api/v1/auth', authRoute);

module.exports = app;
