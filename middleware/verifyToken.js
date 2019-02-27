const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token){
    res.status(403).json({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, process.env.SERVER_SECRET, (err, decoded) => {
    if(err){
      res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;