const express = require('express');
const db = require('./usersModel');
const route = express.Router();
const { authenticate } = require('../../auth/authMiddleWare');

// /api/users
route.get('/', authenticate, (req, res) => {
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

route.get('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  db.getById(id)
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
