const { Sequelize } = require('sequelize');
const dbConfig = require("./database.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.supporters = require("../models/supporter.model.js")(sequelize, Sequelize);
db.admins = require("../models/admin.model.js")(sequelize);

module.exports = db;
