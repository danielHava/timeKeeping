const TaskController = require('../controllers').TasksController;
const apiResponse = require('../utils/ApiResponse');
const express = require('express');
const router = express.Router();

router.get('/all', TaskController.list, apiResponse);

router.get('/:id', TaskController.find, apiResponse);

router.post('/', TaskController.create, apiResponse);

router.put('/:id', TaskController.update, apiResponse);

router.delete('/:id', TaskController.delete, apiResponse );

module.exports = router;