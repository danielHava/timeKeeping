const Users = require('../db/models').User;
const jwt = require('jsonwebtoken');
const getParamsFromReq = require('../utils/helpers').getParamsFromReq;
const storeQueryResults = require('../utils/helpers').storeQueryResults;

const setFromRequestBody = (req) => ({ ...req.body });

const AuthController = {
  register: async (req, res, next) => {
    let result;
    try {
      const query = getParamsFromReq(req, [setFromRequestBody]);
      const newUser = await Users.create(query);
      if (newUser) {
        result = {
          message: 'User successfully registered.',
          auth: false,
          token: null,
          data: newUser
        };
        storeQueryResults(req, result, 201);
        next();
      }
    } catch (error) {
      result = {
        message: 'Error registering User.',
        auth: false,
        token: null,
        data: error
      };
      next(error);
    }
  },
  details: (req, res, next) => {
    let result;
    try {
      const user = req.user;
      if (!user) {
        result = { message: 'No user found.', auth: false };
        storeQueryResults(req, result, 404);
        next();
      } else {
        result = {
          message: `${user.role}: ${user.email} with id: ${user.id}, was found.`,
          auth: true
        };
        storeQueryResults(req, result, 200);
        next();
      }
    } catch (error) {
      result = {
        message: 'Error finding User.',
        auth: false,
        data: error
      };
      next(error);
    }
  },
  login: async (email, password, done) => {
    let result;
    try {
      const query = { email };
      const user = await Users.findOne({ where: query });
      if (!user) {
        result = { message: 'No user found.', auth: false, token: null };
        // storeQueryResults(req, result, 404);
        return done(null, result);
      }
      const passwordIsValid = await user.isValidPassword(password);
      if (!passwordIsValid) {
        result = {
          message: 'Invalid password.',
          auth: false,
          token: null
        };
        // storeQueryResults(req, result, 401);
        return done(null, result);
      }
      const token = jwt.sign(
        { id: user.get('id'), role: user.get('role'), email: user.get('email') },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION,
          notBefore: process.env.JWT_EXPIRATION }
      );
      result = {
        message: 'User logged in successfully',
        auth: true,
        token: token
      };
      // storeQueryResults(, result, 200);
      return done(null, result);
    } catch (error) {
      result = {
        message: 'Error logging in User.',                
        auth: false,
        token: null,
        data: error
      };
      return done(error, result);
    }
  }
};

module.exports = AuthController;
