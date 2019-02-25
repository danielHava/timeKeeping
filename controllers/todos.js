const express = require('express');
const router = express.Router();
const todos = require('../db/models').Todo;

router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'welcome to our todo end-point!' });
});

router.get('/all', (req, res) => {
  todos
    .all()
    .then(result => res.status(200).json(result))
    .catch(error => res.status(400).json(error));
});

router.get('/:id', (req, res) => {
  todos
    .findById(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(400).json(error));
});

router.post('/', (req, res) => {
  todos
  .create({
    content: req.body.content
  })
  .then(result => res.status(200).json(result) )
  .catch(error => res.status(400).json(error));
});

router.put('/:id', (req, res) => {
  todos.update({
    title: req.body.title,
    content: req.body.content
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(result => res.status(200).json(result))
  .catch(error => res.status(400).json(error));
});

router.delete('/:id', (req, res) => {
  todos.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(result => res.status(200).json(result))
  .catch(error => res.status(400).json(error));
});

module.exports = router;
