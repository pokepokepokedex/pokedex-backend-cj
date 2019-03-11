const db = require('../../data/dbConfig');
const users = require('./usersModel');
const auth = require('../../auth/authModel');

describe('users model', () => {
  beforeAll(() => {
    return auth.register({
      username: 'cj1',
      password: 'password123',
      email: 'cjj@gmail.com'
    });
  });
  afterEach(() => {
    return db('users').truncate();
  });
  describe('getAll', () => {
    it('should return all users with status 200', () => {
      return users
        .getAll()
        .then(res =>
          expect(res[0]).toEqual({
            id: 1,
            username: 'cj1',
            email: 'cjj@gmail.com'
          })
        )
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe('getById', () => {
    it('should return one user by id with status 200', () => {
      return users
        .getById({ 1: 1 })
        .then(res => {
          expect(res[0]).toEqual({
            id: 1,
            username: 'cj1',
            email: 'cjj@gmail.com'
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});
