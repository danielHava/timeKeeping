const UsersController = require('../controllers').UsersController;
const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => res.status(200).send({
//     message: 'Welcome to the User end-point!',
// }));

router.get('/:id', UsersController.find);

router.post('/', UsersController.create);

router.put('/:id', UsersController.update);

router.delete('/:id', UsersController.delete);

module.exports = router;
