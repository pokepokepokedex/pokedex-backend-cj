const express = require("express");
const db = require("./authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const route = express.Router();

// register route
route.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(422).json({ message: "Missing username and password fields" });
  } else {
    const hash = bcrypt.hashSync(password, 10);
    db.register({ username, password: hash, email })
      .then(() => {
        res.status(201).json({ message: `You have registered, ${username}!` });
      })
      .catch(err => res.status(500).json(err));
  }
});

// login route
route.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ message: "Missing username and password fields" });
  } else {
    db.login({ username })
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: `30 days`
          });
          res.json({ id: user.id, message: `Welcome ${username}`, token });
        } else {
          res.status(401).json({ messag: "Invalid Credentials" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

module.exports = route;
