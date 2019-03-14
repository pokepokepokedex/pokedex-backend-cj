const express = require('express');
const db = require('./backpackModel');
const route = express.Router();

route.get('/', (req, res) => {
  db.getAll()
    .then(bp => {
      res.json(bp);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// /api/backpack
route.post('/', (req, res) => {
  const { pokedex_number, users_id } = req.body;
  db.insert({ id, users_id })
    .then(bp => {
      res.status(201).json(bp);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

route.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, users_id } = req.body;
  db.update(id, { name, users_id })
    .then(bp => {
      res.json(bp);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

route.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.delete(id)
    .then(bp => {
      res.json(bp);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = route;
