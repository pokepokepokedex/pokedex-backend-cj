require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../knexfile');
const secondKnexConfig = require('../secondKnexfile');
const environment = process.env.ENVIRONMENT || 'development';

const db = knex(knexConfig[environment]);
const pokeDb = knex(secondKnexConfig[environment]);

module.exports = { db, pokeDb };
