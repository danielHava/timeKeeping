const Users = require('../db/models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthController = {
  register(req, res){
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    Users
      .create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          role: req.body.role,
      })
      .then(result => {
        const createdUser = result.dataValues.id;
        // expires in 24 hours
        const token = jwt.sign({ id: createdUser }, process.env.SERVER_SECRET, { expiresIn: 86400 });
        res.status(201).json({ auth: true, token: token })
      })
      .catch(error => res.status(403).json(error));
  },
  details(req, res){
    const token = req.headers['x-access-token'];
    if (!token){
      res.status(403).json({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.SERVER_SECRET, (err, decoded) => {
      if(err){
        res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      }
      Users
        .findById(decoded.id)
        .then(result => {
          if(!result){
            res.status(404).json({ message: 'No user found.' });
          }
          res.status(200).json({ message: `User ${result.firstName} ${result.lastName} found.` });
        })
        .catch(error => res.status(500).json({ message: 'Error on server.', err: error }));
    });

  },
  login(req, res){
    Users
      .findOne({where: { email: req.body.email }})
      .then(result => {
        if(!result){
          res.status(404).json({ message: 'No user found.' });
        }
        const user = result.dataValues
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid){
          res.status(401).send({ auth: false, token: null });
        }
        const token = jwt.sign({ id: user.id }, process.env.SERVER_SECRET, { expiresIn: 86400 });
        res.status(200).json({ auth: true, token: token });
      })
      .catch(error => res.status(500).json({ message: 'Error on server.', err: error }))
  }

}
module.exports = AuthController;