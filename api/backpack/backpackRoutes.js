const express = require('express');
const db = require('./backpackModel');
const { authenticate } = require('../../auth/authMiddleWare');
const route = express.Router();

// /api/backpack

route.get('/', (req, res) => {
  db.getAll()
    .then(bp => {
      res.json(bp);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

route.post('/', (req, res) => {
  const { pokedex_number, users_id, type1, name, type2 } = req.body;
  if (!pokedex_number || !users_id || !type1 || !name) {
    res.status(500).json({ message: 'Missing fields required' });
  } else {
    db.insert({ pokedex_number, users_id, type1, type2, name })
      .then(bp => {
        res.status(201).json(bp);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});
// get all pokemon in specific users backpack
route.get('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  db.getUsersBpById(id)
    .then(bp => {
      if (bp) {
        res.status(200).json(bp);
      } else {
        res.status(404).json({ message: 'ID not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

route.put('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const { name, users_id } = req.body;
  if (!name || !users_id) {
    res.status(500).json({ message: 'Missing fields required' });
  } else {
    db.update(id, { name, users_id })
      .then(bp => {
        if (bp) {
          res.json(bp);
        } else {
          res.status(404).json({ message: 'ID not found' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

route.delete('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(bp => {
      if (bp) {
        res.json(bp);
      } else {
        res.status(404).json({ message: 'ID not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = route;
