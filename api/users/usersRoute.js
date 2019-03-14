const express = require('express');
const db = require('./usersModel');
const route = express.Router();
const { authenticate } = require('../../auth/authMiddleWare');

// /api/users
route.get('/', authenticate, (req, res) => {
  db.getAll(res)
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

route.get('/:id', authenticate, (req, res) => {
  const id = req.params.id;

  db.getById(id)
    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json({ message: 'User Id not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

route.delete('/:id', authenticate, (req, res) => {
  const id = req.params.id;

  db.getById(id)
    .then(deleted => {
      if (deleted === 0) {
        res.status(404).json({ message: 'ID not found' });
      } else {
        db.deleteById(id)
          .then(() => {
            res.json(deleted);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// TBA

// route.put('/:id', (req, res) => {
//   const id = req.params.id;
//   const changes = req.params.id;

//   if (!)
//   db.updateById(id, changes)
//     .then(user => {
//       res.json(user);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

module.exports = route;
