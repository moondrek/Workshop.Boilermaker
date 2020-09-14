const db = require("./db");
const Player = require("./Player");
const Wealth = require("./Wealth");

Wealth.belongsToMany(Player, { through: "accumulation" });

module.exports = { db, Player, Wealth };
