const db = require('../../data/dbConfig');

const getAll = () => {
  return db('users').select('id', 'username', 'email');
};

const getById = id => {
  return db('users')
    .select('id', 'username', 'email')
    .where({ id })
    .first();
};

const deleteById = id => {
  return db('users');
};

const insert = user => {
  return db('users').insert(user);
};

const update = () => {
  return db('users');
};

module.exports = {
  getAll,
  getById,
  deleteById,
  insert,
  update
};
