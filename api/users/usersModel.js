const db = require('../../data/dbConfig');

const getAll = res => {
  return db('users')
    .select('id', 'username', 'email')
    .paginate(15, 1, true);
};

const getById = async (id, res) => {
  const knex = await db('users')
    .select('id', 'username', 'email')
    .where({ id })
    .first();

  const bp = await db('users');

  return Promise.all(knex).then(completed => {});
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
