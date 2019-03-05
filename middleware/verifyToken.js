const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  if(req.baseUrl === '/api/v1/auth' && (req.path === '/register' || req.path === '/login')){
    next();
  }else{
    const token = req.headers['x-access-token'];    
    if (!token){
      res.status(403).json({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.SERVER_SECRET, (err, decoded) => {
      if(err){
        res.status(500).json({ auth: false, message: 'Failed to authenticate token.', error: err });
      }
      req.userId = (decoded.id) ? decoded.id : 'undefined id';
      req.userRole = (decoded.role) ? decoded.role : 'undefined role';
      next();
    });
  }
};

module.exports = verifyToken;
