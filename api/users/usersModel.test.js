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
    it('should return all users ', () => {
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
    it('should return one user by id ', () => {
      return users
        .getById(1)
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
  describe('updateById', () => {
    it('should update user based on id', () => {
      return users.updateById(1, { username: 'cj11' }).then(res => {
        expect(res).toBe(0);
      });
    });
  });
  describe('deleteById', () => {
    it('should delete user by id and return the user', () => {
      users.deleteById(1);
      return users.getById(1).then(res => {
        expect(res).toBe(undefined);
      });
    });
  });
});
