const request = require('supertest');
const server = require('./authRoute');
const db = require('./authModel');

describe('authorization', () => {
  describe('register', () => {
    it('should register with status 201', () => {
      return request(server)
        .post('/auth/register')
        .send({
          username: 'administration',
          password: 'password',
          email: 'admin@mail.com'
        })
        .then(res => expect(res.status).toBe(201));
    });
    it('should return error 404 because no payload provided', () => {
      return request(server)
        .post('/auth/register')
        .send()
        .then(res => expect(res.status).toBe(404));
    });
    it('should return error because username already registered', () => {
      beforeEach(() => {
        return request(server)
          .post('/auth/register')
          .send({
            username: 'ceciljohn',
            password: 'password',
            email: 'cecil@mail.com'
          });
      });
      return request(server)
        .post('/auth/register')
        .send({
          username: 'ceciljohn',
          password: 'password',
          email: 'cecil1@mail.com'
        })
        .then(res => expect(res.status).toBe(500));
    });
  });
});
