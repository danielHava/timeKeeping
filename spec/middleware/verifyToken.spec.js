const verifyToken = require('../../middleware/verifyToken');
// const jwt = require('jsonwebtoken');

describe('verifyToken middleware', () => {

  const jwt = require('jsonwebtoken');
  const res = {
    status: () => {},
    json: () => {}
  };
  const req = {
    headers: {}
  };

  beforeEach(() => {
    req.headers = {};
    
    spyOn(res, 'status').and.returnValue(res);
    spyOn(res, 'json');
  });

  it('should fail if no token', () => {
    verifyToken(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('should fail because token is invalid', () => {
    req.headers = {'x-access-token': 'whatever'};

    spyOn(jwt, 'verify').and.callFake((...args) => {
      return args[2](true, null);
    });

    verifyToken(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(500);
    expect(jwt.verify).toHaveBeenCalled();
  });

  it('should pass because token is valid', () => {
    req.headers = {'x-access-token': 'whatever'};

    spyOn(jwt, 'verify').and.callFake((...args) => {
      return args[2](false, {});
    });

    const next = jasmine.createSpy('next');

    verifyToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(jwt.verify).toHaveBeenCalled();
  });

  // afterAll(() => {
  //   expect(res.json).toHaveBeenCalledWith(
  //     jasmine.objectContaining({
  //       auth: false, 
  //       message: jasmine.any(String)
  //     })
  //   );
  // });

})
