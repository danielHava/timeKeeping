const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const AuthController = require('../controllers').AuthController;

passport.use('login', new LocalStrategy({
  usernameField : 'email',
  passwordField: 'password'
}, AuthController.login));

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use('jwt', new JWTstrategy(opts, (jwt_payload, done) => {
  try {
    return done(null, jwt_payload);
  } catch (error) {
    return done(error);
  }
}));
