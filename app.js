require('dotenv').config();
const express = require('express');
// middleware
const logger = require('morgan');
const notFound = require('./middleware/errorHandler').notFound;
const methodNotAllowed = require('./middleware/errorHandler').methodNotAllowed;
const verifyToken = require('./middleware/verifyToken');
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
 
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth Middleware
// app.use(verifyToken);
// Error Middleware
// app.use(notFound);
// app.use(methodNotAllowed);

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/api/v1/tasks', verifyToken, tasksRoute);
app.use('/api/v1/users', verifyToken, usersRoute);
app.use('/api/v1/auth', authRoute);

module.exports = app;
