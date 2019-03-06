const Request = require('request');
const base_url = 'http://localhost:3000/api/v1/';
const url = require('url');

describe('Base Api', () => {

  describe('GET /', () => {
    const data = {};
    beforeAll((done) => {
      Request.get(base_url, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 404', () => {
      expect(data.status).toBe(404);
    });
    it('Body', () => {
      expect(data.body.indexOf('Cannot GET /api/v1/') !== -1).toBe(true);
    });
  });

  describe('GET /tasks/', () => {
    const data = {};
    beforeAll((done) => {
      Request.get(url.resolve(base_url, 'tasks'), (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 403', () => {
        expect(data.status).toBe(403);
    });
    it('Message', () => {
        expect(data.body.message).toBe('No token provided.');
    });
    it('Auth', () => {
        expect(data.body.auth).toBe(false);
    });
  });

});