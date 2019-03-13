const express = require('express');
const db = require('./backpackModel');
const usersDb = require('../../data/dbConfig');
const route = express.Router();

// /api/backpack

route.post('/', (req, res) => {
  const { poke_name, pokedex_number, user_id } = req.body;
  if (!poke_name || !pokedex_number) {
    res.status(422).json({ message: 'Poke_name and Pokedex_number required' });
  } else {
    db.find(poke_name).then(exist => {
      if (exist) {
        res.status(401).json({ message: 'pokemon already exist' });
      } else {
        db.add({ poke_name, pokedex_number })
          .then(id => {
            usersDb('users_backpack')
              .insert({ backpack_id: id[0], users_id: user_id })
              .then(resp => {
                res
                  .status(200)
                  .json({ message: 'successfully Added pokemon to backpack' });
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
  }
});

module.exports = route;
