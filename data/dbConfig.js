require("dotenv").config();
const knex = require("knex");
const paginator = require("knex-paginator");
const knexConfig = require("../knexfile");
const environment = process.env.ENVIRONMENT || "development";

const db = knex(knexConfig.development);
paginator(db);
module.exports = db;
