function getParamsFromReq(req, paramSetterCallbacks) {
  return paramSetterCallbacks.reduce((params, callback) => ({
    ...params,
    ...callback(req)
  }), {});
}

module.exports =  getParamsFromReq;
