const db = require('../../data/dbConfig');

const getusers = () => {
  return db('users');
};

const getEverything = () => {
  console.log('hello');
  return db('pokemon').select('pokedex_number as id', 'name');
};

const getAll = query => {
  console.log('hello');
  const { page = 1, limit = 8 } = query;
  return db('pokemon')
    .select(
      'pokedex_number as id',
      'name',
      'pokedex_number',
      'type1',
      'type2',
      'height_m',
      'weight_kg',
      'abilities',
      'base_happiness',
      'hp',
      'attack',
      'defense',
      'sp_attack',
      'sp_defense',
      'speed',
      'generation',
      'capture_rate'
    )
    .paginate(limit, page, true);
};

const getById = id => {
  return db('pokemon')
    .select(
      'pokedex_number as id',
      'name',
      'pokedex_number',
      'type1',
      'type2',
      'height_m',
      'weight_kg',
      'abilities',
      'base_happiness',
      'hp',
      'attack',
      'defense',
      'sp_attack',
      'sp_defense',
      'speed',
      'generation',
      'capture_rate'
    )
    .where({ pokedex_number: id })
    .first();
};

module.exports = {
  getAll,
  getById,
  getusers,
  getEverything
};
