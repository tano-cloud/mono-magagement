const environment = "development",
  config = require("../knexfile.js")[environment],
  knex = require("knex")(config);

  module.exports = knex;
