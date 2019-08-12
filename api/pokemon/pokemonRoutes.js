const express = require("express");
const db = require("./pokemonModel");
const route = express.Router();
// const { authenticate } = require("../../auth/authMiddleWare");

// /api/pokemon

route.get("/all", async (req, res) => {
  const resp = await db.getEverything(res);

  try {
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
});

route.get("/errthang", (req, res) => {
  db.getErrThang(res)
    .then(poke => {
      res.json(poke);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

route.get("/", async (req, res) => {
  const resp = await db.getAll(req.query, res);

  try {
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
});

route.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ message: "ID not found" });
  }
  db.getById(id)
    .then(resp => {
      res.json(resp);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = route;
