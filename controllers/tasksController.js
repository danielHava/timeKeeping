const Tasks = require('../db/models').Tasks;

const TaskController = {
  list(req, res){
    let queryParams = {};
    if(req.userRole === 'user'){
      queryParams.where = { createdBy: Number(req.userId) }
    }
    Tasks
      .findAll(queryParams)
      .then(result => {
        if(!result){
          res.status(200).json({ message: "You don't have any Tasks." });
        }else{
          res.status(200).json(result);
        }
      })
      .catch(error => res.status(400).json(error));
  },
  find(req, res){
    let queryParams = { where: { id: req.params.id } };
    if(req.userRole === 'user'){
      queryParams.where.createdBy =  Number(req.userId);
    }
    Tasks
      .findOne(queryParams)
      .then(result => {
        if(!result){
          res.status(200).json({ message: "You don't have any Tasks." });
        }else{
          res.status(200).json(result);
        }
      })
      .catch(error => res.status(404).json(error));
  },
  create(req, res){
    let queryParams = {};
    if(req.userRole === 'user'){
      queryParams.where = { createdBy: Number(req.userId) }
    }
    Tasks
      .create({
        content: req.body.content,
        ...queryParams
      })
      .then(result => res.status(201).json(result) )
      .catch(error => res.status(406).json(error));
  },
  update(req, res){
    let queryParams = { where: { id: req.params.id } };
    if(req.userRole === 'user'){
      queryParams.where.createdBy =  Number(req.userId);
    }
    Tasks
      .update({
        content: req.body.content
      },
      queryParams)
      .then(result => res.status(204).json(result))
      .catch(error => res.status(401).json(error));
  },
  delete(req, res){
    let queryParams = { where: { id: req.params.id } };
    if(req.userRole === 'user'){
      queryParams.where.createdBy =  Number(req.userId);
    }
    Tasks
      .destroy(queryParams)
      .then(() => res.status(204).json({ message: "You deleted a Task." }))
      .catch(error => res.status(404).json(error));
  },
}

module.exports = TaskController;
