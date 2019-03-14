const express = require('express');
const db = require('./backpackModel');
const route = express.Router();

route.get('/', (req, res) => {
  db.getAll()
    .then()
    .catch();
});

route.get('/:id', (req, res) => {
  const id = req.params.id;

  db.getById(id)
    .then(bp => {
      res.json(bp);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

route.post('/', (req, res) => {
  const { id, name } = req.body;
  db.insert(id, name)
    .then(bp => {
      res.status(201).json(bp);
    })
    .catch(res.status(500).json(err));
});

route.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  db.update(id, body)
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
