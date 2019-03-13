const db = require('../../data/dbConfig');

const getAll = () => {
  return db('backpack');
};

const add = action => {
  return db('backpack').insert(action);
};

const find = poke_name => {
  return db('backpack')
    .where({ poke_name })
    .first();
};

const update = (id, changes) => {
  return db('backpack')
    .where({ id })
    .update(changes);
};

const del = id => {
  return db('backpack')
    .where({ id })
    .del();
};

module.exports = {
  getAll,
  add,
  update,
  del,
  find
};
