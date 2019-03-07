const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
  const token = req.headers['x-access-token'];   
  if (!token){
    res.status(403).json({ auth: false, message: 'No token provided.' });
  }else{
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err){
        res.status(500).json({ auth: false, message: 'Failed to authenticate token.', error: err });
      }else{
        req.userId = (decoded.id) ? decoded.id : 'undefined id';
        req.userRole = (decoded.role) ? decoded.role : 'undefined role';
        next();
      }
    });
  }
}

module.exports = verifyToken;
