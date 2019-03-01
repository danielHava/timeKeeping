const AuthController = require('../controllers').AuthController;
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Auth end-point!',
}));
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', AuthController.details);

module.exports = router;