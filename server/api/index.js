const router = require("express").Router();

router.get("/", (req, res, next) => {
  try {
    req.session.counter = req.session.counter + 1 || 1;
    console.log(req.body, req.session);
    res.send("Hello World");
  } catch (error) {
    next(error);
  }
});

router.use((req, res, next) => {
  const newErr = new Error("API Route Not Found!");
  newErr.status = 404;
  next(newErr);
});

module.exports = router;
