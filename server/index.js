//Node
const path = require("path");
//Express+
const express = require("express");
const app = express();
const PORT = process.env.PORT || 1337;
const session = require("express-session");
//Third-party modules
const morgan = require("morgan");
//DB/Sequelize
const { db } = require("./db");

//Logging middleware
app.use(morgan("dev"));

//Parser middleware
app.use(express.json());

//Connect Session Sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbSessionStore = new SequelizeStore({ db: db });
dbSessionStore.sync();

//Session middleware
if (!process.env.SESSION_SECRET) {
  console.log("WARNING!!! SESSION SECRET NOT FOUND!!!");
}

app.use(
  session({
    secret: process.env.SESSION_SECRET || "WOW THAT IS DEFINITELY NOT RIGHT",
    store: dbSessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

//Static file middleware
app.use(express.static(path.join(__dirname, "../client/dist")));

//API routes
app.use("/api", require("./api"));

//Unmatched GET requests get the homepage
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/client/dist/index.html"));
});

//Error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);

  res
    .status(err.status || 500)
    .send(err.message || "Uh-oh! We encountered an internal server error");
});

const init = async () => {
  try {
    await db.sync();
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT);
  console.log(`Listening at http://localhost:${PORT}`);
};

init();
