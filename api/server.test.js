const request = require('supertest');
const server = require('./server');

describe('GET /', () => {
  it('should give a 200', () => {
    return request(server)
      .get('/')
      .then(res => expect(res.status).toBe(200));
  });
});
