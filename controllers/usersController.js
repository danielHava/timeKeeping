const Users = require("../db/models").Users;

const UserController = {
  find(req, res){
    Users
      .findById(req.params.id)
      .then(result => res.status(200).json(result))
      .catch(error => res.status(404).json(error));
  },
  create(req, res){
    Users
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })
      .then(result => res.status(201).json(result))
      .catch(error => res.status(406).json(error));
  },
  update(req, res){
    Users
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
      .then(result => res.status(204).json(result))
      .catch(error => res.status(401).json(error));
  },
  delete(req, res){
    Users
      .destroy({
          where: {
            id: req.params.id
          }
        })
      .then(() => res.status(204).end())
      .catch(error => res.status(404).json(error));
  },
}

module.exports = UserController;
