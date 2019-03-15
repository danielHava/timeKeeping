function storeQueryResults(req, response, status = 200) {
  req.result = {
    response,
    status 
  }
}

module.exports = storeQueryResults;
