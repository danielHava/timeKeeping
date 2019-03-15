const passport = require('passport');

const authUsing = (strategy, session = false) => {
  return passport.authenticate(strategy, { session : session });
}
const authInit = () => {
  return passport.initialize();
}

module.exports = {
  authInit,
  authUsing
}
