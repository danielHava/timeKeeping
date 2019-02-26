require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const todosRoute = require('./routes').todosRoute;
const usersRoute = require('./routes').usersRoute;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todos/', todosRoute);
app.use('/api/users/', usersRoute);

module.exports = app;
