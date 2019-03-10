const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

afterAll(() => {
  return db('users').truncate();
});

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
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it('should return error 422 because no payload provided', () => {
      return request(server)
        .post('/auth/register')
        .send()
        .then(res => expect(res.status).toBe(422));
    });

    // adds a user to the db to test uniqueness
    beforeEach(() => {
      return request(server)
        .post('/auth/register')
        .send({
          username: 'ceciljohn',
          password: 'password',
          email: 'cecil@mail.com'
        });
    });

    // add same user
    it('should return error because username already registered', () => {
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
