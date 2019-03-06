const TasksController = require('../controllers').TasksController;
const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();

const TaskController = new TasksController();

router.use(verifyToken);

router.get('/', (req, res) => res.status(200).send({
    id: req.userId,
    role: req.userRole,
    message: 'Welcome to the Todo end-point!',
}));

router.get('/all', TaskController.list);

router.get('/:id', TaskController.find);

router.post('/', TaskController.create);

router.put('/:id', TaskController.update);

router.delete('/:id', TaskController.delete);

module.exports = router;