const Tasks = require('../db/models').Task;

const addBody = (req) => ({...req.body });
const setStatusNew = () => ({ status: 'new' });
const addTaskId = (req) => ({ where: { id: req.params.id } });
const setCreatedBy = (req) => {
  if(req.userRole === 'user'){
    return { where: { createdBy: Number(req.userId) } };
  }
  return {};
};

function createResult(req, response, status = 200) {
  req.result = {
    response,
    status 
  }
}

function createParams(req, callbacks) {
  return callbacks.reduce((qParams, callback) => ({
    ...qParams,
    ...callback(req)
  }), {});
}

const TaskController = {
  list: async (req, res, next) => {
    try {
      const query = createParams(req, [setCreatedBy]);
      
      const items = await Tasks.findAll(query);
      createResult(req, items, 201);
      next();
    } catch(e) {
      next(e);
    }
  },
  find: async (req, res, next) => {
    try {
      const query = createParams(req, [setCreatedBy, addTaskId]);
      const items = await Tasks.findOne(query);
      createResult(req, items, 201);
      next();
    } catch(e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const query = createParams(req, [setCreatedBy, addBody, setStatusNew]);
      const items = await Tasks.create(query);
      createResult(req, items, 201);
      next();
    } catch(e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const query = createParams(req, [setCreatedBy, addTaskId, addBody]);
      const items = await Tasks.update(query);
      createResult(req, items, 201);
      next();
    } catch(e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const query = createParams(req, [addTaskId]);
      const items = await Tasks.destroy(query);
      createResult(req, items, 201);
      next();
    } catch(e) {
      next(e);
    }
  }
}

module.exports = TaskController;
