const passport = require('passport');

const authUsing = (strategy, session = false) => {
  return passport.authenticate(strategy, { session : session });
}

module.exports = authUsing;
