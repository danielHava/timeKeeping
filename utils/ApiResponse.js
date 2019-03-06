const status = require('http-status');

function Factory() {
  this.getResponse = function(code, payload, message = ''){
    let response = {
      code: code,
      type: status[code],
      message: message ? message : status[`${code}_MESSAGE`],
      data: payload ? payload : []
    };
    response.setMessage = function(msg){
      this.message = msg;
      return this;
    }
    response.send = function(res){
      res.status(this.code);
      res.json(this);
      return;
    }
    return response;
  }
}

function ResponseFactory() {
  this.factory = new Factory();
  this.getApiResponse = function(promise, action, req, res) {
    let response = {};
    let responseMessage;
    const defaultMessages = {
      list: {
        success: 'Successfully listing your Tasks.',
        fail: 'Failed listing your Tasks.',
        error: 'Unexpected error on server! While listing your tasks.'
      },
      find: {
        success: `Successfully found your Task with id: ${req.params.id}.`,
        fail: `Failed to find Task with id: ${req.params.id}.`,
        error: `Unexpected error on server! While finding Task with id: ${req.params.id}.`
      },
      create: {
        success: 'Successfully created your Task.',
        fail: 'Failed creating your Task.',
        error: 'Unexpected error on server! While creating your Task.'
      },
      update: {
        success: `Successfully updated your Task with id: ${req.params.id}.`,
        fail: `Failed updating your Task with id: ${req.params.id}.`,
        error: 'Unexpected error on server! While updating your Task.'
      },
      destroy: {
        success: `Successfully deleted your Task with id: ${req.params.id}.`,
        fail: `Failed deleting your Task with id: ${req.params.id}.`,
        error: 'Unexpected error on server! While deleting your Task.'
      }
    };
    promise
      .then(result => {
        if(!result){
          response = this.factory.getResponse(404, result);
          responseMessage = defaultMessages[action]['fail'];
        }else{
          response = this.factory.getResponse(200, result);
          responseMessage = defaultMessages[action]['success'];
        }
      })
      .catch(error => {
        response = this.factory.getResponse(500, error);
        responseMessage = defaultMessages[action]['error'];
      })
      .finally(() => {
        response.setMessage(responseMessage).send(res);
      });
    return;
  }
}

module.exports = ResponseFactory;