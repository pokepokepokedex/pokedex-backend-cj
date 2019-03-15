const db = require('../../data/dbConfig');
const data = require('./data');

const getusers = () => {
  return db('users');
};

const getEverything = async res => {
  console.log('hello');
  const knex = await db('pokemon').select(
    'pokedex_number as id',
    'name',
    'type1',
    'type2'
  );
  const results = knex.map(async item => {
    item.name = item.name.split(' ').join('_');
    return item;
  });
  Promise.all(results).then(completed => {
    knex.data = completed;
    res.status(200).json(knex);
  });
};

const getAll = async (query, res) => {
  console.log('hello');
  const { page = 1, limit = 8 } = query;
  let knex = await db('pokemon')
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
  const results = knex.data.map(async item => {
    item.graph = data[`${item.name}`];
    item.name = item.name.split(' ').join('_');
    return item;
  });
  Promise.all(results).then(completed => {
    knex.data = completed;
    res.status(200).json(knex);
  });
};
// get all without pagination
const getErrThang = async res => {
  console.log('hello');
  let knex = await db('pokemon').select(
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
  );

  return knex.map(item => {
    item.graph = data[`${item.name}`];
    item.name = item.name.split(' ').join('_');
    return item;
  });
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
  getEverything,
  getErrThang
};
