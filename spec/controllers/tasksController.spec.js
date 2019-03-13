const TasksController = require('../../controllers').TasksController;

describe('Tasks Controller', () => {
  const Tasks = require('../../db/models').Task;

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
      req.userId = '11';
      req.userRole = 'user';
      spyOn(res, 'status');
      spyOn(res, 'json');
      taskController = new TasksController();
    });
    let taskList = [
      {
        id: 0,
        title: 'Test task 0',
        content: 'Content for test task 0',
        lastModifiedBy: 0
      },
      {
        id: 1,
        title: 'Test task 1',
        content: 'Content for test task 1',
        lastModifiedBy: 1
      },
      {
        id: 2,
        title: 'Test task 2',
        content: 'Content for test task 2',
        lastModifiedBy: 2
      },
      {
        id: 3,
        title: 'Test task 3',
        content: 'Content for test task 3',
        lastModifiedBy: 3
      }
    ];

    describe('> LIST user\'s tasks', () => {

      it('should return an array of tasks', () => {

        spyOn(Tasks, 'findAll').and.callFake(() => (taskList));

        spyOn(taskController.factory, 'getApiResponse').and.callFake((...args) => {
          args[3].status(200);
          args[3].json({
            data: args[0]
          });
          return;
        });

        taskController.list(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
          jasmine.objectContaining({
            data: jasmine.any(Array)
          })
        );

      });

      it('should return an error', () => {

        spyOn(Tasks, 'findAll').and.callFake(() => ([]));

        spyOn(taskController.factory, 'getApiResponse').and.callFake((...args) => {
          args[3].status(404);
          args[3].json({
            data: args[0]
          });
          return;
        });

        taskController.list(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
          jasmine.objectContaining({
            data: []
          })
        );

      });

    });

    describe('> FIND user\'s task with some id', () => {

      beforeEach(() => {
        req.params = { id: 2 };
      });

      it('should return an array with one element ', () => {

        spyOn(Tasks, 'findOne').and.callFake((...args) => {
          const taskId = args.shift().where.id;
          const result = taskList.find(item => item.id === taskId);
          return [result];
        });

        spyOn(taskController.factory, 'getApiResponse').and.callFake((...args) => {
          args[3].status(200);
          args[3].json({
            data: args[0]
          });
          return;
        });

        taskController.find(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
          jasmine.objectContaining({
            data: [jasmine.any(Object)]
          })
        );

      });

      it('should return an error', () => {

        spyOn(Tasks, 'findOne').and.callFake(() => ([]));

        spyOn(taskController.factory, 'getApiResponse').and.callFake((...args) => {
          args[3].status(404);
          args[3].json({
            data: args[0]
          });
          return;
        });

        taskController.find(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
          jasmine.objectContaining({
            data: []
          })
        );

      });

    });

    describe('> CREATE a new task for user', () => {

      it('should return the new task', () => {

        req.userid = 111;
        req.body = {
          id: 4,
          title: 'New test task',
          content: 'New test task content',
          lastModifiedBy: Number(req.userid)
        };

        spyOn(Tasks, 'create').and.callFake((...args) => {
          taskList.push(args.shift());
          return taskList;
        });

        spyOn(taskController.factory, 'getApiResponse').and.callFake((...args) => {
          args[3].status(200);
          args[3].json({
            data: args[0]
          });
          return;
        });

        taskController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
          jasmine.objectContaining({
            data: jasmine.any(Array)
          })
        );

      });

      it('should return an error when a task has no data', () => {

        spyOn(Tasks, 'create').and.callFake(() => ([]));

        spyOn(taskController.factory, 'getApiResponse').and.callFake((...args) => {
          args[3].status(404);
          args[3].json({
            data: args[0]
          });
          return;
        });

        taskController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
          jasmine.objectContaining({
            data: []
          })
        );

      });

    });

    describe('> UPDATE user\'s task', () => {

      it('should return the updated task when id exists and changes are valid', () => {

        req.body = {
          title: 'Updated test task',
          content: 'Updated test task content',
          lastModifiedBy: Number(req.userId)
        };

        spyOn(Tasks, 'update').and.callFake((...args) => {
          const updatedTaskBody = args.shift();
          const taskId = args.shift().where.id;
          const oldTask = taskList.find(item => item.id === taskId);
          const updatedTask = {...oldTask, ...updatedTaskBody};
          return [updatedTask];
        });

        spyOn(taskController.factory, 'getApiResponse').and.callFake((...args) => {
          args[3].status(200);
          args[3].json({
            data: args[0]
          });
          return;
        });

        taskController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
          jasmine.objectContaining({
            data: [jasmine.any(Object)]
          })
        );

      });
      
      xit('should return an error when id doesn\'t exist task', () => {

        req.params = {};
        req.body = {
          title: 'Updated test task',
          content: 'Updated test task content',
          lastModifiedBy: Number(req.userId)
        };

        spyOn(Tasks, 'update').and.callFake((...args) => {
          const updatedTaskBody = args.shift();
          const taskId = args.shift().where.id;
          const result = taskList.map((item, index) => {
            if(item.id === taskId){
              return Object.assign(item, updatedTaskBody);
            }
            return item;
          });
          return taskList;
        });

        spyOn(taskController.factory, 'getApiResponse').and.callFake((...args) => {
          args[3].status(200);
          args[3].json({
            data: args[0]
          });
          return;
        });

        taskController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
          jasmine.objectContaining({
            data: jasmine.any(Array)
          })
        );
      });
      
      xit('should return an error when changes aren\'t valid', () => { });

    });

    describe('deletes user\'s task with some id', () => { });

  });
  // describe('for role=manager and for role=admin', () => {
  // });
});