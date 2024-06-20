const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "tryandhack", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
