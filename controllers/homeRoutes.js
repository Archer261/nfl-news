const router = require("express").Router();
const { ExpressHandlebars } = require("express-handlebars");
const session = require("express-session");
const { Team, Article, User, FanScore } = require("../models");
const withAuth = require("../utils/auth");
const getLinks = require("../utils/getArticleData");

router.get("/", async (req, res) => {
  try {
    const teamData = await Team.findAll({});

    // Serialize data so the template can read it
    const teams = teamData.map((team) => team.get({ plain: true }));

    const sessionId = req.session.id;

    console.log("session email: " + req.session.email);

    // Pass serialized data and session flag into template
    res.render("homepage", {
      sessionId,
      teams,
      sessionEmail: req.session.email,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/team/:team_name", async (req, res) => {
  try {
    const teamData = await Team.findOne({
      where: { team_name: req.params.team_name },
    });
    console.log("Team Data: " + teamData.team_name);
    const baseUrl = "https://www.espn.com/nfl/story/";
    const url =
      "https://www.espn.com/nfl/team/_/name/" +
      teamData.location_abbr +
      "/" +
      teamData.location +
      "-" +
      teamData.team_name;

    // console.log(url);
    console.log(typeof articles);

    getLinks(url).then((articles) => {
      //   console.log("look here: " + JSON.stringify(articles));
      res.render("article", {
        articles,
        url,
        baseUrl,
        loggedIn: req.session.loggedIn,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile/:email", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne(
      { where: { email: req.params.email } },
      {
        attributes: { exclude: ["password"] },
        include: [{ model: FanScore, RecentArticle, SavedArticle, Team }],
      }
    );

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get signup template
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signUp");
});

// Get login template
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signIn");
});

module.exports = router;
