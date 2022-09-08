const router = require('express').Router();
const { Team, Article, User, FanScore } = require('../models');
const withAuth = require('../utils/auth');
const getLinks = require('../utils/getArticleData');

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

        const url = 'https://www.espn.com/nfl/team/_/name/' + team.location_abbr + '/' + team.location + '-' + team.team_name;

        var cheerioData =  getLinks(url)

        res.render('article', {
            ...team,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/user/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findOne({ where: { team_name: req.params.team_name } }, {
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
