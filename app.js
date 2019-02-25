require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const apiTodoController = require('./controllers/todos');
const apiUserController = require('./controllers/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todo/', apiTodoController);
app.use('/api/user/', apiUserController);

module.exports = app;
