require('dotenv').config();
const express = require('express');
// middleware
const logger = require('morgan');
const passport = require('passport');
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
app.use(passport.initialize());

// routes
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/api/v1/tasks', passport.authenticate('jwt', { session : false }), tasksRoute);
app.use('/api/v1/users', passport.authenticate('jwt', { session : false }), usersRoute);
app.use('/api/v1/auth', authRoute);

app.use(genericErrorHandler);

module.exports = app;
