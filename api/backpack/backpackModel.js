const db = require('../../data/dbConfig');

const getAll = () => {
  return db('backpack');
};

const getById = id => {
  return db('backpack')
    .where({ id })
    .first();
};

const getUsersBpById = id => {
  const query = db('backpack').where({ users_id: id });
  const pokemonQuery = db('pokemon').select();
};

const insert = body => {
  return db('backpack')
    .insert(body)
    .then(([id]) => getById(id));
};

const update = (id, changes) => {
  return db('backpack')
    .where({ id })
    .update(changes)
    .then(count => count > 0 && getById(id));
};

const remove = id => {
  return db('backpack')
    .where({ id })
    .del();
};

module.exports = {
  getById,
  insert,
  update,
  remove,
  getAll,
  getUsersBpById
};
