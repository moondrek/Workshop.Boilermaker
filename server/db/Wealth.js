const { DataTypes } = require("sequelize");
const db = require("./db");

const Wealth = db.define("wealth", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Wealth;
