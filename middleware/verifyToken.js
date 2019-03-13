const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
  const token = req.headers['x-access-token'];   
  if (!token){
    req.auth = false;
    req.message = 'No token provided.';
    next();
  }else{
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err){
        req.auth = false;
        req.message = 'Failed to authenticate token.';
        req.result = err;
        next();
      }else{
        req.userId = (decoded.id) ? decoded.id : 'undefined id';
        req.userRole = (decoded.role) ? decoded.role : 'undefined role';
        next();
      }
    });
  }
}

module.exports = verifyToken;
