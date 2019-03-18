const Users = require('../db/models').User;
const jwt = require('jsonwebtoken');
const getParamsFromReq = require('../utils/helpers').getParamsFromReq;
const storeQueryResults = require('../utils/helpers').storeQueryResults;
const ApiError = require('../utils/ApiError');
const acl = require('../config/acl');

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
        acl.addUserRoles(newUser.get('id'), newUser.get('role'), err => {
          if (err) {
            return next(error);
          }
          storeQueryResults(req, result, 201);
          return next();
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  details: async (req, res, next) => {
    let result;
    try {
      const user = await Users.findOne({ where: { id: req.user.id } });
      if (!user) {
        result = { message: 'No user found.', auth: false };
        storeQueryResults(req, result, 404);
         return next();
      } else {
        result = {
          message: `${user.role}: ${user.email} with id: ${user.id}, was found.`,
          auth: true
        };
        storeQueryResults(req, result, 200);
         return next();
      }
    } catch (error) {
      return next(error);
    }
  },
  login: async (email, password, done) => {
    try {
      const query = { email };
      const user = await Users.findOne({ where: query });
      if (!user) {
        return done(new ApiError({ message: 'No user was found.', status: 404, isPublic: true }));
      }
      const passwordIsValid = await user.isValidPassword(password);
      if (!passwordIsValid) {
        return done(new ApiError({ message: 'Invalid password.', status: 401, isPublic: true }));
      }
      const token = jwt.sign(
        { id: user.get('id') },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );
      return done(null, user, { 
        message: 'User logged in successfully', 
        email: user.get('email'), 
        token: token, 
        expiresIn: process.env.JWT_EXPIRATION 
      });
    } catch (error) {
      return done(error, false, { message: 'Error logging in User.' });
    }
  }
};

module.exports = AuthController;
