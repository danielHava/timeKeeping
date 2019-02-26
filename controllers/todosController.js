const Todos = require('../db/models').Todo;

const TodoController = {
  list(req, res){
    Todos
      .findAll({})
      .then(result => res.status(200).json(result))
      .catch(error => res.status(400).json(error));
  },
  find(req, res){
    Todos
      .findById(req.params.id)
      .then(result => res.status(200).json(result))
      .catch(error => res.status(404).json(error));
  },
  create(req, res){
    Todos
      .create({
        content: req.body.content
      })
      .then(result => res.status(201).json(result) )
      .catch(error => res.status(406).json(error));
  },
  update(req, res){
    Todos
      .update({
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(result => res.status(204).json(result))
      .catch(error => res.status(401).json(error));
  },
  delete(req, res){
    Todos
      .destroy({
          where: {
            id: req.params.id
          }
        })
      .then(() => res.status(204).end())
      .catch(error => res.status(404).json(error));
  },
}
module.exports = TodoController;
