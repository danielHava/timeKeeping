const apiResponse = (req, res) => {
  if(req.result){
    const { status, response } = req.result;
    res.status(status).json(response)
  }else{
    res.json(req.authInfo);
  }
}

module.exports = apiResponse;
