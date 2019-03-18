const httpStatus  = require('http-status');

// Error response middleware for 404 not found.
function notFound(req, res){
  res.status(httpStatus.NOT_FOUND).json({
    error: {
      code: httpStatus.NOT_FOUND,
      message: httpStatus[`${httpStatus.NOT_FOUND}_MESSAGE`]
    }
  });
}

// Method not allowed error middleware. This middleware should be placed at
// the very bottom of the middleware stack.
function methodNotAllowed(req, res){
  // const token = req.headers['x-access-token'];    
  // if (!token){
  //   res.status(403).json({ auth: false, message: 'No token provided.' });
  // }
  res.status(httpStatus.METHOD_NOT_ALLOWED).json({
    error: {
      code: httpStatus.METHOD_NOT_ALLOWED,
      message: httpStatus[`${httpStatus.METHOD_NOT_ALLOWED}_MESSAGE`]
    }
  });
}

function genericErrorHandler(err, req, res, next){
  res.status(err.statusCode || 500).json(err.stack);
}

module.exports = {
  notFound,
  methodNotAllowed,
  genericErrorHandler
};
