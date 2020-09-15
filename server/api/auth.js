const router = require("express").Router();
const { Player } = require("../db");

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

router.delete("/logout", async (req, res, next) => {
  try {
    req.logout();
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
