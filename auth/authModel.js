const db = require('../data/dbConfig');

const register = user => {
  return db('users').insert(user);
};

const login = ({ username, password }) => {
  return db('users')
    .where({ username })
    .first();
};

const getAll = () => {
  return db('users');
};

module.exports = {
  register,
  login,
  getAll
};
