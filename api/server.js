const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRouter = require('../auth/authRouter');
const usersRouter = require('./users/usersRoute');

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

module.exports = server;
