const Tasks = require('../db/models').Task;
const status = require('http-status');

const apiRespond = (code, type, message, data, res) => {
  res.status(code);
  res.json({
    code: code,
    type: type,
    message: message,
    data: data
  });
  return;
}

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
          apiRespond(status.NOT_FOUND, status[404], "You don't have any Tasks.", [], res);
        }else{
          apiRespond(status.OK, status[200], "Succesfully got your Tasks.", result, res);
        }
      })
      .catch(error => {
        // apiRespond(status.INTERNAL_SERVER_ERROR, status[500], "Error on server.", error, res);
        apiRespond(status.INTERNAL_SERVER_ERROR, status[500], "Unexpected error on server!", error, res);
      });
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
          apiRespond(status.NOT_FOUND, status[404], `No tasks FOUND with id: ${req.params.id}.`, [], res);
        }else{
          apiRespond(status.OK, status[200], `Succesfully FOUND Task with id: ${req.params.id}.`, result, res);
        }
      })
      .catch(error => {
        apiRespond(status.INTERNAL_SERVER_ERROR, status[500], "Unexpected error on server!", error, res);
      });
  },
  create(req, res){
    let queryParams = {};
    if(req.userRole === 'manager' && req.body.createdBy){
      queryParams.createdBy = Number(req.body.createdBy);
    }else{
      queryParams.createdBy = Number(req.userId);
    }
    Tasks
      .create({...req.body, ...queryParams, status: 'new'})
      .then(result => {
        apiRespond(status.OK, status[200], "Succesfully CREATED your Task.", result, res);
      })
      .catch(error => {
        // apiRespond(status.INTERNAL_SERVER_ERROR, status[500], "Error CREATING your Task.", error, res);
        apiRespond(status.INTERNAL_SERVER_ERROR, status[500], "Unexpected error on server!", error, res);
      });
  },
  update(req, res){
    let queryParams = { where: { id: req.params.id } };
    if(req.userRole === 'user'){
      queryParams.where.createdBy =  Number(req.userId);
    }
    Tasks
      .update({...req.body}, queryParams)
      .then(result => {
        apiRespond(status.ACCEPTED, status[202], `Succesfully UPDATED your Task with id: ${req.params.id}.`, result, res);
      })
      .catch(error => {
        // apiRespond(status.UNAUTHORIZED, status[401], `You don't have permission to UPDATE the Task with id: ${req.params.id}.`, error, res);
        apiRespond(status.INTERNAL_SERVER_ERROR, status[500], 'Unexpected error on server!', error, res);
      });
  },
  delete(req, res){
    let queryParams = { where: { id: req.params.id } };
    if(req.userRole === 'user'){
      queryParams.where.createdBy =  Number(req.userId);
    }
    Tasks
      .destroy(queryParams)
      .then(result => {
        apiRespond(status.NO_CONTENT, status[204], `Succesfully DELETED your Task with id: ${req.params.id}.`, result, res);
      })
      .catch(error => {
        // apiRespond(status.UNAUTHORIZED, status[401], `You don't have permission to DELETE the Task with id: ${req.params.id}.`, error, res);
        apiRespond(status.INTERNAL_SERVER_ERROR, status[500], 'Unexpected error on server!', error, res);
      });
  },
}

module.exports = TaskController;
