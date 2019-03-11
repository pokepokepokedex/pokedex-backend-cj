const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRouter = require('../auth/authRouter');
const usersRouter = require('./users/usersRoute');
const pokemonRoutes = require('./pokemon/pokemonRoutes');
const db = require('../data/dbConfig');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send('<h1>API is working 🔥</h1>');
});
server.use('/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/pokemon', pokemonRoutes);

server.get('/data', async (req, res) => {
  const resp = await db('pokemon')
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
    .paginate(15, 1, true);
  console.log(resp);
  try {
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
});

module.exports = server;
