const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 1337;

//Logging middleware
app.use(morgan("dev"));

//Static file middleware
app.use(express.static(path.join(__dirname, "../client/dist")));

//Parser middleware
app.use(express.json());

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

const init = () => {
  app.listen(PORT);
  console.log(`Listening at http://localhost:${PORT}`);
};

init();
