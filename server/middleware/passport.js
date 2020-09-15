const router = require("express").Router();
const passport = require("passport");
const { Player } = require("../db");

//Passport authentication middleware
router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(function (user, done) {
  try {
    done(null, user.id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async function (id, done) {
  try {
    done(null, await Player.findByPk(id));
  } catch (error) {
    done(error);
  }
});

module.exports = router;
