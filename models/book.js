const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Book = sequelize.define("book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  bname: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  takenDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  returnDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  returnedDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

module.exports = Book;
