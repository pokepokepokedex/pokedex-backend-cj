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
          // email: "admin@administrator.com"
        },
        {
          username: "beniscool",
          password: bcrypt.hashSync("password", 10)
          // email: "beniscool@administrator.com"
        },
        {
          username: "ceciljohn",
          password: bcrypt.hashSync("password", 10)
          // email: "ceciljohn@administrator.com"
        }
      ]);
    });
};
