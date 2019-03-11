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

server.get('/data', (req, res) => {
  return db('pokemon')
    .then(res => {
      res.json(res);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;
