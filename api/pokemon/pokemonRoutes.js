const express = require('express');
const db = require('./pokemonModel');
const route = express.Router();
const { authenticate } = require('../../auth/authMiddleWare');

// /api/pokemon

route.get('/all', authenticate, async (req, res) => {
  const resp = await db.getEverything(res);

  try {
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
});

route.get('/', authenticate, async (req, res) => {
  const resp = await db.getAll(req.query, res);

  try {
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
});

route.get('/:id', (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(resp => {
      res.json(resp);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = route;
