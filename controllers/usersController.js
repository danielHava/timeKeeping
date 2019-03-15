const Users = require("../db/models").Users;
const getParamsFromReq = require('../utils/helpers').getParamsFromReq;
const storeQueryResults = require('../utils/helpers').storeQueryResults;
const bcrypt = require('bcryptjs');

const setWhereId = (req) => ({ where: { id: req.params.id } });
const setFromRequestBody = (req) => ({...req.body });
const setHashedPass = (req) => ({ password: bcrypt.hashSync(req.body.password, 8) });

const UserController = {
  find: async (req, res, next) => {
    try {
      const query = getParamsFromReq(req, [setWhereId]);
      const items = await Users.findOne(query);
      storeQueryResults(req, items, 200);
      next();
    } catch(e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const query = getParamsFromReq(req, [setFromRequestBody, setHashedPass]);
      const items = await Users.create(query);
      storeQueryResults(req, items, 201);
      next();
    } catch(e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const query = getParamsFromReq(req, [setWhereId, setFromRequestBody]);
      const items = await Users.update(query);
      storeQueryResults(req, items, 204);
      next();
    } catch(e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const query = getParamsFromReq(req,[setWhereId]);
      const items = await Users.destroy(query);
      storeQueryResults(req, items, 204);
      next();
    } catch(e) {
      next(e);
    }
  }
}

module.exports = UserController;
