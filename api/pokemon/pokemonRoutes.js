const express = require('express');
const db = require('./pokemonModel');
const route = express.Router();

// /api/pokemon

route.get('/', async (req, res) => {
  const resp = await db.getAll();

  try {
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
});

route.get('/:id', (req, res) => {
  const id = req.params.id;
  db.getById({ id })
    .then(res => {
      res.json(res);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = route;
