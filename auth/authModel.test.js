const db = require('../data/dbConfig');
const auth = require('./authModel');
//unit tests

 describe('auth model', () => {
  describe('register', () => {
    afterEach(() => {
      return db('users').truncate();
    });

     it('should post provided body into the db', () => {
      return auth
        .register({
          username: 'cj1',
          password: 'password123',
          email: 'cjj@gmail.com'
        })
        .then(res => expect(res[0]).toEqual(1));
    });
  });
  describe('login', () => {
    beforeEach(() => {
      return auth.register({
        username: 'cj1',
        password: 'password123',
        email: 'cjj@gmail.com'
      });
    });
    afterEach(() => {
      return db('users').truncate();
    });
    it('should check whether provided body exists in db', () => {
      return auth
        .login({ username: 'cj1', password: 'password123' })
        .then(res => expect(res.username).toEqual('cj1'));
    });
  });
  describe('getAll users', () => {
    beforeEach(() => {
      return auth.register({
        username: 'cj1',
        password: 'password123',
        email: 'cjj@gmail.com'
      });
    });
    afterEach(() => {
      return db('users').truncate();
    });
    it('should get all users', () => {
      return auth
        .getAll()
        .then(res => expect(res.length).toBeGreaterThanOrEqual(1));
    });
  });
});