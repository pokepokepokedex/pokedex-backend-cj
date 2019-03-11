const request = require('supertest');
const server = require('../server');

describe('pokemon routes', () => {
  describe('getAll', () => {
    it('should give status 200', () => {
      return request(server)
        .get('/api/pokemon')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
