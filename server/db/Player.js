const { DataTypes } = require("sequelize");
const db = require("./db");

const Player = db.define("player", {
  name: {
    type: DataTypes.STRING,
    defaultValue: "Stranger",
  },
});

module.exports = Player;
