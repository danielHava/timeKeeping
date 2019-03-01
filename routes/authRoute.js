const AuthController = require('../controllers').AuthController;
const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();

router.use(verifyToken);

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Auth end-point!',
}));
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', AuthController.details);

module.exports = router;