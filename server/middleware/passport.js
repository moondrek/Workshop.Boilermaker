const router = require("express").Router();
const passport = require("passport");
const { Profiler } = require("react");
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

//google strategy
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:1337/api/auth/google/verify",
    },
    async (token, refreshToken, profile, done) => {
      try {
        const { sub: googleId, email } = profile._json;
        const [player] = await Player.findOrCreate({
          where: { email },
          defaults: { googleId },
        });

        done(null, player);
      } catch (e) {
        done(e);
      }
    }
  )
);

module.exports = router;
