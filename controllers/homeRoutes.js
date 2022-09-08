const router = require('express').Router();
const { ExpressHandlebars } = require('express-handlebars');
const session = require('express-session');
const { Team, Article, User, FanScore } = require('../models');
const withAuth = require('../utils/auth');




router.get('/', async (req, res) => {
    try {
        const teamData = await Team.findAll({});

        // Serialize data so the template can read it
        const teams = teamData.map((team) => team.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            teams,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/team/:team_name', async (req, res) => {
    try {
        const teamData = await Team.findOne({ where: { team_name: req.params.team_name } });

        const team = teamData.get({ plain: true });

        res.render('article', {
            ...team,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile/:email', withAuth, async (req, res) => {
    try {

        const userData = await User.findOne({ where: { email: req.params.email } }, {
            attributes: { exclude: ['password'] },
            include: [{ model: FanScore, RecentArticle, SavedArticle, Team }],
        });


        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            loggedIn: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get signup template
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signUp');
});

// Get login template
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signIn');
});

module.exports = router;
