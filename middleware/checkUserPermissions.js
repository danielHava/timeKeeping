const ApiError = require('../utils/ApiError');
const acl = require('../config/acl');

async function checkUserPermissions(req, res, next){
  if(!req.user){
    return next(new ApiError({message: 'No User authenticated!', status: 401, isPublic: true}));
  }else{
    acl.isAllowed(
      req.user.get('id').toString(),
      req.url,
      req.method.toLowerCase(),
      (error, allowed) => {
        if (error) {
          const permissionError = { message: 'Insufficient permissions to access resource.', status: 401, isPublic: true };
          return next(new ApiError(permissionError));
        }
        return next();
      }
    );
  }
}

module.exports = checkUserPermissions;
