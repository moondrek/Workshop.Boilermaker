const { DataTypes } = require("sequelize");
const db = require("./db");
const crypto = require("crypto");

const Player = db.define(
  "player",
  {
    name: {
      type: DataTypes.STRING,
      defaultValue: "Stranger",
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
    googleId: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: setSaltAndHash,
      beforeUpdate: setSaltAndHash,
    },
  }
);

function setSaltAndHash(player) {
  if (!player.password) {
    return;
  }
  player.salt = crypto.randomBytes(16).toString("hex");
  player.password = Player.encryptPassword(player.password, player.salt);
}

Player.encryptPassword = (plainPassword, salt) => {
  return crypto.scryptSync(plainPassword, salt, 16).toString("hex");
};

Player.prototype.checkPassword = function (candidatePassword) {
  return Player.encryptPassword(candidatePassword, this.salt) === this.password;
};

module.exports = Player;
