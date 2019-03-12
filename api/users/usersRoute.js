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
  if (id === false) {
    res.status(404).json({ message: 'Id not found' });
  } else {
    db.getById(id)
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: `You are not authorized: ${err.message}` });
      });
  }
});

route.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: 'Id not found' });
  } else {
    db.getById(id)
      .then(deleted => {
        db.deleteById(id)
          .then(() => {
            res.json(deleted);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

route.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.params.id;

  db.updateById(id, changes)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = route;
