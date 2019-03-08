const verifyToken = require('../../middleware/verifyToken');
// const jwt = require('jsonwebtoken');

describe('verifyToken middleware', () => {

  const jwt = require('jsonwebtoken');
  const res = {
    status: () => {},
    json: () => {}
  };
  const req = { headers: {} };
  let next;

  beforeEach(() => {
    req.headers = {};
    spyOn(res, 'status').and.returnValue(res);
    spyOn(res, 'json');
    next = jasmine.createSpy('next');
  });

  describe('validates token', () => {

    it('should fail if no token', () => {
      console.log('1');
  
      verifyToken(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        jasmine.objectContaining({
          auth: false, 
          message: jasmine.any(String)
        })
      );
      expect(next).not.toHaveBeenCalled();
    });
  
    it('should fail because token is invalid', () => {
      console.log('2');
      req.headers = {'x-access-token': 'whatever'};
  
      spyOn(jwt, 'verify').and.callFake((...args) => {
        return args[2](true, null);
      });
  
      verifyToken(req, res, next);
  
      expect(jwt.verify).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        jasmine.objectContaining({
          auth: false, 
          message: jasmine.any(String)
        })
      );
      expect(next).not.toHaveBeenCalled();
    });
  
    it('should pass because token is valid', () => {
      console.log('3');
      req.headers = {'x-access-token': 'whatever'};
  
      spyOn(jwt, 'verify').and.callFake((...args) => {
        return args[2](false, {});
      });
  
      verifyToken(req, res, next);
      expect(jwt.verify).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      expect(req.userId).not.toBe(undefined);
      expect(req.userRole).not.toBe(undefined);
    });

  });

  describe('unpacks token data', () => {

    it('should find userId', () => {
      console.log('4');
      req.headers = {'x-access-token': 'whatever'};

      const uId = jasmine.any(Number);

      spyOn(jwt, 'verify').and.callFake((...args) => {
        return args[2](false, { id: uId });
      });
  
      verifyToken(req, res, next);
      
      expect(jwt.verify).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      
      expect(req.userId).toEqual(uId);
      expect(req.userRole).not.toBe(undefined);

    });

    it('should find userRole', () => {
      console.log('5');
      req.headers = {'x-access-token': 'whatever'};

      const uRole = jasmine.any(String);

      spyOn(jwt, 'verify').and.callFake((...args) => {
        return args[2](false, { role: uRole });
      });
  
      verifyToken(req, res, next);
      
      expect(jwt.verify).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      
      expect(req.userId).not.toBe(undefined);
      expect(req.userRole).toEqual(uRole);
    });

    it('should find both userId and userRole', () => {
      console.log('6');
      req.headers = {'x-access-token': 'whatever'};

      const uId = jasmine.any(String);
      const uRole = jasmine.any(String);

      spyOn(jwt, 'verify').and.callFake((...args) => {
        return args[2](false, { id: uId, role: uRole });
      });
  
      verifyToken(req, res, next);
      
      expect(jwt.verify).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      
      expect(req.userId).toEqual(uId);
      expect(req.userRole).toEqual(uRole);
    });

  });

})
