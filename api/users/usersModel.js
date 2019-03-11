const db = require('../../data/dbConfig');

const getAll = () => {
  return db('users')
    .select('id', 'username', 'email')
    .paginate(15, 1, true);
};

const getById = id => {
  return db('users')
    .select('id', 'username', 'email')
    .where({ id })
    .first();
};

const deleteById = id => {
  return db('users')
    .where({ id })
    .del();
};

const updateById = (id, changes) => {
  return db('users')
    .where({ id })
    .update(changes);
};

module.exports = {
  getAll,
  getById,
  deleteById,
  updateById
};
