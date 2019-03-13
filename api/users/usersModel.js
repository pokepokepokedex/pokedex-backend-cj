const db = require('../../data/dbConfig');

const getAll = () => {
  return db('users')
    .select('id', 'username', 'email')
    .paginate(15, 1, true);
};

const getById = id => {
  const query = db('users')
    .select('id', 'username', 'email')
    .where({ id })
    .first();

  const promises = [query, getBackpackById(id), getRatingById(id)];
  return Promise.all(promises).then(results => {
    let [user, backpack, rating] = results;
    user = { ...results[0], backpack, rating };
    console.log(results);
    return user;
  });
};
const getBackpackById = id => {
  return db('users_backpack as u')
    .select(
      'b.id as id',
      'b.poke_name as poke_name',
      'b.pokedex_number as pokedex_number'
    )
    .join('backpack as b', 'id', 'u.backpack_id')
    .where({ id });
};

const getRatingById = id => {
  return db('users_poke_rating as u')
    .select('r.id as id', 'r.rating as rating')
    .join('poke_rating as r', 'id', 'u.rating_id')
    .where({ id });
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
