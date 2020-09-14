const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/boilermaker",
  {
    logging: false,
  }
);

(async () => {
  try {
    await db.authenticate();
    console.log("DB Authenticated");
  } catch (error) {
    console.error("DB Not Authenticated:", error);
  }
})();

module.exports = db;
