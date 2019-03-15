const request = require('supertest');
const server = require('../server');

describe('pokemon routes', () => {
  describe('getAll', () => {
    it('should give status 401 for not being authorized', () => {
      return request(server)
        .get('/api/pokemon')
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });
  describe('Authorized', () => {
    beforeEach(done => {
      return request(server)
        .post('./auth/register')
        .send({
          username: 'javontay',
          password: 'password',
          email: 'jv@administration.com'
        });
    });
    describe('getAll', () => {
      it('should give back status 200', () => {});
    });
  });
});
