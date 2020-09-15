const router = require("express").Router();
const session = require("express-session");

const { db } = require("../db");

//Connect Session Sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbSessionStore = new SequelizeStore({ db: db });
dbSessionStore.sync();

//Session middleware
if (!process.env.SESSION_SECRET) {
  console.log("WARNING!!! SESSION SECRET NOT FOUND!!!");
}

router.use(
  session({
    secret: process.env.SESSION_SECRET || "WOW THAT IS DEFINITELY NOT RIGHT",
    store: dbSessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

module.exports = router;
