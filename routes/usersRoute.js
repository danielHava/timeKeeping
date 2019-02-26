const userController = require('../controllers').usersController;
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the User end-point!',
}));

router.get('/:id', userController.find);

router.post('/', userController.create);

router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

module.exports = router;
