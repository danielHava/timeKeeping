const express = require('express');
const router = express.Router();
const users = require("../db/models").User;

router.get('/', function(req, res) {
  res.json({ message: 'welcome to our user end-point!' });
});

router.get('/:id', (req, res) =>
  users.findById(req.params.id).then(result => res.json(result))
);

router.post('/', (req, res) => {
  users
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    })
    .then(result => res.json(result))
    .catch(error => res.status(400).json(error));
});

router.put('/:id', (req, res) => {
  users
    .update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(result => res.json(result))
    .catch(error => res.status(400).json(error));
});

router.delete('/:id', (req, res) => {
  users
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(result => res.json(result))
    .catch(error => res.status(400).json(error));
});

module.exports = router;
