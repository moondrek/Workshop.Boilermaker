//Environmental Variables
if (process.env.NODE_ENV === "development") {
  require("./localSecrets");
}
const PORT = process.env.PORT || 1337;

//Node
const path = require("path");
//Express+
const express = require("express");
const app = express();

//Third-party modules
const morgan = require("morgan");
//DB/Sequelize
const { db } = require("./db");

//Logging and Parse middleware
app.use(morgan("dev"));
app.use(express.json());

//Session and Passport Middleware
app.use(require("./middleware/session"));
app.use(require("./middleware/passport"));

//Static and Routes
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/api", require("./api"));
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

//Initialize the server
const init = async () => {
  try {
    await db.sync({ force: false });
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT);
  console.log(`Listening at http://localhost:${PORT}`);
};

init();
