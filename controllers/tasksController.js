const Tasks = require('../db/models').Task;
const getParamsFromReq = require('../utils/helpers').getParamsFromReq;
const storeQueryResults = require('../utils/helpers').storeQueryResults;

const setFromRequestBody = (req) => ({...req.body });
const setStatusNew = () => ({ status: 'new' });
const setWhereId = (req) => ({ where: { id: req.params.id } });
const setCreatedBy = (req) => (req.userRole === 'user' ? {where: {createdBy: Number(req.userId)}} : {});


const TaskController = {
  list: async (req, res, next) => {
    try {
      const query = getParamsFromReq(req, [setCreatedBy]);
      
      const items = await Tasks.findAll(query);
      storeQueryResults(req, items, 200);
      next();
    } catch(e) {
      next(e);
    }
  },
  find: async (req, res, next) => {
    try {
      const query = getParamsFromReq(req, [setCreatedBy, setWhereId]);
      const items = await Tasks.findOne(query);
      storeQueryResults(req, items, 201);
      next();
    } catch(e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const query = getParamsFromReq(req, [setCreatedBy, setFromRequestBody, setStatusNew]);
      const items = await Tasks.create(query);
      storeQueryResults(req, items, 201);
      next();
    } catch(e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const query = getParamsFromReq(req, [setCreatedBy, setWhereId, setFromRequestBody]);
      const items = await Tasks.update(query);
      storeQueryResults(req, items, 201);
      next();
    } catch(e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const query = getParamsFromReq(req, [setWhereId]);
      const items = await Tasks.destroy(query);
      storeQueryResults(req, items, 201);
      next();
    } catch(e) {
      next(e);
    }
  }
}

module.exports = TaskController;
