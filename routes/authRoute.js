const AuthController = require('../controllers').AuthController;
const authUsing = require('../utils/authentication').authUsing;
const checkUserPermissions = require('../middleware/checkUserPermissions');
const apiResponse = require('../utils/ApiResponse');
const express = require('express');
const router = express.Router();

router.post('/register', authUsing('jwt'), checkUserPermissions, AuthController.register, apiResponse);

router.post('/login', authUsing('login'), apiResponse);

router.get('/details', authUsing('jwt'), checkUserPermissions, AuthController.details, apiResponse);

module.exports = router;
