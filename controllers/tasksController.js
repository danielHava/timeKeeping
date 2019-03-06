const Tasks = require('../db/models').Task;
const ResponseFactory = require('../utils/ApiResponse');

class TaskController{
  constructor(){
    this.factory = new ResponseFactory();
    this.list = this.list.bind(this);
    this.find = this.find.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  list(req, res) {
    let queryParams = {};
    if(req.userRole === 'user'){
      queryParams.where = { createdBy: Number(req.userId) }
    }
    this.factory.getApiResponse(Tasks.findAll(queryParams), 'list', req, res);
  }
  find(req, res) {
    let queryParams = { where: { id: req.params.id } };
    if(req.userRole === 'user'){
      queryParams.where.createdBy =  Number(req.userId);
    }
    this.factory.getApiResponse(Tasks.findOne(queryParams), 'find', req, res);
  }
  create(req, res) {
    let queryParams = {};
    if(req.userRole === 'manager' && req.body.createdBy){
      queryParams.createdBy = Number(req.body.createdBy);
    }else{
      queryParams.createdBy = Number(req.userId);
    }
    const newEntry = {...req.body, ...queryParams, status: 'new'};
    this.factory.getApiResponse(Tasks.create(newEntry), 'create', req, res);
  }
  update(req, res) {
    let queryParams = { where: { id: req.params.id } };
    if(req.userRole === 'user'){
      queryParams.where.createdBy =  Number(req.userId);
    }
    this.factory.getApiResponse(Tasks.update({...req.body}, queryParams), 'update', req, res);
  }
  delete(req, res) {
    let queryParams = { where: { id: req.params.id } };
    if(req.userRole === 'user'){
      queryParams.where.createdBy =  Number(req.userId);
    }
    this.factory.getApiResponse(Tasks.destroy(queryParams), 'delete', req, res);
  }
}

module.exports = TaskController;
