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

  const promises = [knex, getBackpackById(id)];

  return Promise.all(promises).then(completed => {
    let [users, backpack] = completed;
    users = {
      ...completed[0],
      backpack
    };
    return users;
  });
};

const getBackpackById = id => {
  return db('backpack').where({ users_id: id });
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
  updateById,
  getBackpackById
};
