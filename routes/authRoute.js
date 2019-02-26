const authController = require('../controllers').authController;
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Auth end-point!',
}));

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authController.details);

module.exports = router;