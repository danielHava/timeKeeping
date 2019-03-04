const TasksController = require('../controllers').TasksController;
const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();

router.use(verifyToken);

router.get('/', (req, res) => res.status(200).send({
    id: req.userId,
    role: req.userRole,
    message: 'Welcome to the Todo end-point!',
}));
router.get('/all', TasksController.list);

router.get('/:id', TasksController.find);

router.post('/', TasksController.create);

router.put('/:id', TasksController.update);

router.delete('/:id', TasksController.delete);

module.exports = router;