const UsersController = require('../controllers').UsersController;
const apiResponse = require('../utils/ApiResponse');
const express = require('express');
const router = express.Router();

router.get('/:id', UsersController.find, apiResponse);

router.post('/', UsersController.create, apiResponse);

router.put('/:id', UsersController.update, apiResponse);

router.delete('/:id', UsersController.delete, apiResponse);

module.exports = router;
