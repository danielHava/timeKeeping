const Tasks = require('../db/models').Task;
const status = require('http-status');

function Factory() {
  this.getResponse = function(code, payload, message = ''){
    let response = {};
    response.code = code;
    response.type = status[code];
    response.message = message ? message : status[`${code}_MESSAGE`];
    response.data = payload ? payload : [];
    // console.log(response);
    // response.setMessage = (msg) => (this.message = msg);
    // response.send = function(res){
    //   res.status(this.code);
    //   res.json(this);
    //   return;
    // }
    return response;
  }
}

function ResponseFactory(){
  this.getApiResponse = function(model, action, req, res, params){
    let queryParams = {...params};
    let response = {};
    switch(action){
      case 'create':
        if(req.userRole === 'manager' && req.body.createdBy){
          queryParams.createdBy = Number(req.body.createdBy);
        }else{
          queryParams.createdBy = Number(req.userId);
        }
        model
          .action({...req.body, ...queryParams, status: 'new'})
          .then(result => {
            response = Factory.getResponse(200, result, `Succesfully ${action}ing your ${model}.`);
          })
          .catch(error => {
            response = Factory.getResponse(500, error, `Unexpected error on server! While ${action}ing your ${model}.`);
          });
        break;
      case 'update':
        if(req.userRole === 'user'){
          queryParams.where.createdBy =  Number(req.userId);
          queryParams.where.id = req.params.id;
        }
        model
          .action({...req.body}, queryParams)
          .then(result => {
            response = Factory.getResponse(202, result, `Succesfully ${action}ing your ${model} with id: ${req.params.id}.`);
          })
          .catch(error => {
            response = Factory.getResponse(500, error, `Unexpected error on server! While ${action}ing your ${model}.`);
          });
        break;
      case 'destroy':
        if(req.userRole === 'user'){
          queryParams.where.createdBy =  Number(req.userId);
          queryParams.where.id = req.params.id;
        }
        model
          .action(queryParams)
          .then(result => {
            response = Factory.getResponse(204, result, `Succesfully ${action}ing your ${model} with id: ${req.params.id}.`);
          })
          .catch(error => {
            response = Factory.getResponse(500, error, `Unexpected error on server! While ${action}ing your ${model}.`);
          });
        break;
      default:
        if(req.userRole === 'user'){
          queryParams.where = { createdBy: Number(req.userId) }
        }
        model
          .action(queryParams)
          .then(result => {
            if(!result){
              response = Factory.getResponse(404, result, `Failed ${action}ing your ${model}s.`);
            }else{
              response = Factory.getResponse(200, result, `Succesfully ${action}ing your ${model} with id: ${req.params.id}.`);
            }
          })
          .catch(error => {
            response = Factory.getResponse(500, error, `Unexpected error on server! While ${action} your ${model}.`);
          });
    }
    return response;
  }
}

const TaskController = {
  list(req, res){
    let response = {};
    let queryParams = {};
    if(req.userRole === 'user'){
      queryParams.where = { createdBy: Number(req.userId) }
    }
    // const factory = new Factory();
    // Tasks
    //   .findAll(queryParams)
    //   .then(result => {
    //     if(!result){
    //       response = factory.getResponse(404, result, 'Failed listing your Tasks.');
    //     }else{
    //       response = factory.getResponse(200, result, 'Succesfully listing your Tasks.');
    //     }
    //   })
    //   .catch(error => {
    //     response = factory.getResponse(500, error, 'Unexpected error on server! While listing your tasks.');
    //   });

    //   res.status(200);
    //   res.json(response);
    // console.log(response); 
    // Tasks
    //   .findAll(queryParams)
    //   .then(result => {
    //     if(!result){
    //       apiRespond(status.NOT_FOUND, status[404], "You don't have any Tasks.", [], res);
    //     }else{
    //       apiRespond(status.OK, status[200], "Succesfully got your Tasks.", result, res);
    //     }
    //   })
    //   .catch(error => {
    //     apiRespond(status.INTERNAL_SERVER_ERROR, status[500], "Unexpected error on server!", error, res);
    //   });
    Tasks
      .findAll(queryParams)
      .then(result => {
        if(!result){
          // apiRespond(status.NOT_FOUND, status[404], "You don't have any Tasks.", [], res);
          res.status(404);
          res.json(result);
        }else{
          // apiRespond(status.OK, status[200], "Succesfully got your Tasks.", result, res);
          res.status(200);
          res.json(result);
        }
      })
      .catch(error => {
        res.status(500);
        res.json(error);
        // apiRespond(status.INTERNAL_SERVER_ERROR, status[500], "Unexpected error on server!", error, res);
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
