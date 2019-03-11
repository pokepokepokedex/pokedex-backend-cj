const express = require('express');
const db = require('./pokemonModel');
const route = express.Router();
const { authenticate } = require('../../auth/authMiddleWare');

// /api/pokemon

route.get('/', authenticate, async (req, res) => {
  const resp = await db.getAll(req.query);

  try {
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
});

route.get('/:id', async (req, res) => {
  const id = req.params.id;

  const resp = await db.db.getById({ id });

  try {
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
});

module.exports = route;
