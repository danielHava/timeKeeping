const TasksController = require('../../controllers').TasksController;

describe('Tasks Controller', () => {

  it('can be instatiated via constructor', () => {
    const taskController = new TasksController();
    expect(taskController.factory).toBeDefined();
    expect(taskController.list).toBeDefined();
    expect(taskController.find).toBeDefined();
    expect(taskController.create).toBeDefined();
    expect(taskController.update).toBeDefined();
    expect(taskController.delete).toBeDefined();
  });

  describe('for role=user', () => {

    let taskController;
    const res = {
      status: () => {},
      json: () => {}
    };
    const req = { 
      headers: {},
      params: {}
    };

    beforeEach(() => {
      req.headers = {};
      req.userRole = 'user';
      req.params = { id: jasmine.any(Number) };
      spyOn(res, 'status');
      spyOn(res, 'json');
      taskController = new TasksController();
    });

    it('lists user\'s tasks', () => {
      spyOn(taskController.factory, 'getApiResponse').and.callFake((...args) => {
        args[3].status(200);
        args[3].json({
          code: jasmine.any(Number),
          type: jasmine.any(String),
          message: jasmine.any(String),
          data: jasmine.any(Array)
        });
        return;
      });

      taskController.list(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        jasmine.objectContaining({
          code: jasmine.any(Number),
          type: jasmine.any(String),
          message: jasmine.any(String),
          data: jasmine.any(Array)
        })
      );
    });
    // xit('finds user\'s task with some id', () => {});
    // xit('creates a new task for user', () => {});
    // xit('updates user\'s task with some id', () => {});
    // xit('deletes user\'s task with some id', () => {});

  });

  // xdescribe('for role=manager and for role=admin', () => {

  //   xit('lists all tasks', () => {});
  //   xit('finds task with some id', () => {});
  //   xit('creates a new task for some user', () => {});
  //   xit('creates a new task for himself', () => {});
  //   xit('updates task with some id', () => {});
  //   xit('deletes task with some id', () => {});

  // });

  // describe('for role=admin', () => {
  //   it('lists user\'s tasks', () => {});
  //   it('finds user\'s task with some id', () => {});
  //   it('creates a new task for user', () => {});
  //   it('updates user\'s task with some id', () => {});
  //   it('deletes user\'s task with some id', () => {});
  // });

});