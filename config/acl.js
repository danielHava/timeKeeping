const models = require('../db/models');
const Acl = require('acl');
const AclSeq = require('acl-sequelize');
// const Sequelize = require('sequelize');
const db = models.sequelize;//new Sequelize( 'test', 'root', 'root');    
const acl = new Acl(new AclSeq(db, { prefix: 'acl_' }));

acl.allow([
  {
    roles: 'user',
    allows: [
        { resources: ['api/v1/tasks/'], permissions: '*' },
        { resources: ['api/v1/auth/details'], permissions: ['GET'] }
    ]
  }, {
    roles: 'manager',
    allows: [
        { resources: ['/api/v1/users/'], permissions: '*' }
    ]
  }, {
    roles: 'admin',
    allows: [
      { resources: ['/api/v1/users/', 'api/v1/tasks/', '/api/v1/auth/'], permissions: '*' }
    ]
  }
]);

acl.addRoleParents('admin', ['user', 'manager'])

module.exports = acl;
