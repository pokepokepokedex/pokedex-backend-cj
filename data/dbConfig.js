require("dotenv").config();
const knex = require("knex");
const knexConfig = require("../knexfile");
const secondKnexConfig = require("../secondKnexfile");
const environment = process.env.ENVIRONMENT || "development";

const db = knex(knexConfig[environment]);
const secondDb = knex(secondKnexConfig[environment]);

module.exports = { db, secondDb };
