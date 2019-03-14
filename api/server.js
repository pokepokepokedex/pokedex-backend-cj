const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRouter = require('../auth/authRouter');
const usersRouter = require('./users/usersRoute');
const pokemonRoutes = require('./pokemon/pokemonRoutes');
const backpackRoutes = require('./backpack/backpackRoutes');
const db = require('./pokemon/pokemonModel');

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
server.use('/api/backpack', backpackRoutes);

server.get('/data', async (req, res) => {
  const resp = await db.getAll(req.query);
  console.log(resp);
  try {
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
});

module.exports = server;
