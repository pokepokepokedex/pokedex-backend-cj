const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "admin",
          password: "admin"
        },
        {
          username: "beniscool",
          password: bcrypt.hashSync("password", 10)
        },
        {
          username: "ceciljohn",
          password: bcrypt.hashSync("password", 10)
        }
      ]);
    });
};
