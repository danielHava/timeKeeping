const TodosController = require('../controllers').TodosController;
const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();

router.use(verifyToken);

router.get('/', (req, res) => res.status(200).send({
    id: req.userId,
    role: req.userRole,
    message: 'Welcome to the Todo end-point!',
}));
router.get('/all', TodosController.list);

router.get('/:id', TodosController.find);

router.post('/', TodosController.create);

router.put('/:id', TodosController.update);

router.delete('/:id', TodosController.delete);

module.exports = router;