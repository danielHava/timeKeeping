const AuthController = require('../controllers').AuthController;
const authUsing = require('../utils/authentication');
const apiResponse = require('../utils/ApiResponse');
const express = require('express');
const router = express.Router();

router.post('/register', AuthController.register, apiResponse);

router.post('/login', authUsing('login'), apiResponse);

router.get('/details', authUsing('jwt'), AuthController.details, apiResponse);

module.exports = router;
