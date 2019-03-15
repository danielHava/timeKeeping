require('dotenv').config();
const express = require('express');
// middleware
const logger = require('morgan');
const authUsing = require('./utils/authentication').authUsing;
const authInit = require('./utils/authentication').authInit;
const genericErrorHandler = require('./middleware/errorHandler').genericErrorHandler;
// routes
const tasksRoute = require('./routes').tasksRoute;
const usersRoute = require('./routes').usersRoute;
const authRoute = require('./routes').authRoute;
// docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customeSiteTitle: 'TimeKeeping'
};
 
require('./auth/auth');

const app = express();

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authInit());

// routes
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/api/v1/tasks', authUsing('jwt'), tasksRoute);
app.use('/api/v1/users', authUsing('jwt'), usersRoute);
app.use('/api/v1/auth', authRoute);

app.use(genericErrorHandler);

module.exports = app;
