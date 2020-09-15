const router = require("express").Router();
const passport = require("passport");
const { Player } = require("../db");

//GET /api/auth/me
//If there's an authenticated session, tell the user who they are
router.get("/me", async (req, res, next) => {
  try {
    if (req.user) {
      const { name } = await Player.findByPk(req.user.id);
      res.json({ name });
    } else {
      res.sendStatus(403);
    }
  } catch (e) {
    next(e);
  }
});

// POST /api/auth/register
// Register locally
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const player = await Player.create({
      name,
      email,
      password,
    });
    req.login(player, () => {
      res.json(player);
    });
  } catch (e) {
    if (
      e.errors &&
      e.errors[0].type === "unique violation" &&
      e.errors[0].path === "email"
    ) {
      e.status = 400;
      e.message = "That email has already been registered!";
    }
    next(e);
  }
});

// POST /api/auth/login
// Login via local whatsit
router.post("/login", async (req, res, next) => {
  try {
    const player = await Player.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (player && player.checkPassword(req.body.password)) {
      req.login(player, () => {
        const { name } = player;
        res.json({ name });
      });
    } else {
      const newErr = new Error("Forbidden");
      newErr.status = 401;
      next(newErr);
    }
  } catch (error) {
    next(error);
  }
});

//DELETE /api/auth/logout
//remove user from specified session
router.delete("/logout", async (req, res, next) => {
  try {
    req.logout();
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

//GET /api/auth/google
router.get("/google", passport.authenticate("google", { scope: "email" }));

//GET /api/auth/google/verify
router.get("/google/verify", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

module.exports = router;
