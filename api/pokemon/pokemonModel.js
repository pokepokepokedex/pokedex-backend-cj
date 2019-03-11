const db = require('../../data/dbConfig');

const getAll = () => {
  console.log('hello');
  return db('pokemon')
    .select(
      'pokedex_number as id',
      'name',
      'pokedex_number',
      'type1',
      'type2',
      'classfication',
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
    .paginate(15, 1, true);
};

const getById = id => {
  return db('pokemon')
    .select(
      'pokedex_number as id',
      'name',
      'pokedex_number',
      'type1',
      'type2',
      'classification',
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
    .where('pokedex_number', id)
    .first();
};

module.exports = {
  getAll,
  getById
};
