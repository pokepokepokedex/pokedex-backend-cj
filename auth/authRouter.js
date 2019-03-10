const express = require('express');
const db = require('./authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const route = express.Router();

// register route
route.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(422).json({ message: 'Missing username and password fields' });
  } else {
    const hash = bcrypt.hashSync(password, 10);
    db.register({ username, password: hash, email })
      .then(() => {
        res.status(201).json({ message: `You have registered, ${username}!` });
      })
      .catch(err => res.status(500).json(err));
  }
});

module.exports = route;
