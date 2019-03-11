const express = require('express');
const db = require('./usersModel');
const route = express.Router();
const { authenticate } = require('../../auth/authMiddleWare');

// /api/users
route.get('/', (req, res) => {
  db.getAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `You are not authorized: ${err.message}` });
    });
});

module.exports = route;
