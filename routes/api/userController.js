const express = require('express');
const router = express.Router();
const db = require("../../db/models");

router.get('/', function(req, res) {
  res.json({ message: 'welcome to our user end-point!' });
});

router.get('/:id', (req, res) =>
  db.post.findById(req.params.id).then( (result) => res.json(result))
);

router.post('/', (req, res) => 
  db.post.create({
    title: req.body.title,
    content: req.body.content
  }).then( (result) => res.json(result) )
);

router.put('/:id', (req, res) =>
  db.post.update({
    title: req.body.title,
    content: req.body.content
  },
  {
    where: {
      id: req.params.id
    }
  }).then( (result) => res.json(result) )
);

router.delete('/:id', (req, res) =>
  db.post.destroy({
    where: {
      id: req.params.id
    }
  }).then( (result) => res.json(result) )
);

module.exports = router;
