const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const AuthController = require('../controllers').AuthController;

//Create a passport middleware to handle user login
passport.use('login', new LocalStrategy({
  usernameField : 'email',
  passwordField: 'password'
}, AuthController.login));

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

//This verifies that the token sent by the user is valid
passport.use('jwt', new JWTstrategy(opts, (jwt_payload, done) => {
  try {
    return done(null, jwt_payload);
  } catch (error) {
    return done(error);
  }
}));