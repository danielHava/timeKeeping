const todoController = require('../controllers').todosController;
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Todo end-point!',
}));
router.get('/all', todoController.list);

router.get('/:id', todoController.find);

router.post('/', todoController.create);

router.put('/:id', todoController.update);

router.delete('/:id', todoController.delete);

module.exports = router;