const router = require('express').Router();
const { ExpressHandlebars } = require('express-handlebars');
const session = require('express-session');
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
        console.log('Team Data: ' + teamData.team_name);

        const url =
            'https://www.espn.com/nfl/team/_/name/' +
            teamData.location_abbr +
            '/' +
            teamData.location +
            '-' +
            teamData.team_name;

        console.log(url);
        const array = [
            {
                title: 'Old flames rekindled: Baker vs. the Browns, Russ vs. the Seahawks highlight NFL Week 1 reunions15hWilliam E. RicksMandatory Credit: Joseph Maiorana-USA TODAY Sports',
                surl: '/nfl/story/_/id/34516819/reunions-revenge-games-highlight-opening-week-action-nfl',
            },
            {
                title: 'Cards put QB McCoy on IR, promote McSorley1dJosh WeinfussSteph Chambers/Getty Images',
                surl: '/nfl/story/_/id/34542910/arizona-cardinals-place-qb-colt-mccoy-ir-promote-trace-mcsorley-back-kyler-murray',
            },
            {
                title: 'Weddings, real estate and gym gains: The 2022 NFL offseason as told by social media2dTory BarronGreen Bay Packers',
                surl: '/nfl/story/_/id/34270151/the-2022-nfl-offseason-told-social-media',
            },
            {
                title: '32 paths to Super Bowl LVII: Barnwell projects how every NFL team can get there2dBill BarnwellIllustration by ESPN',
                surl: '/nfl/insider/story/_/id/34533238/how-all-32-nfl-teams-win-super-bowl-projections-paths-scenarios',
            },
            {
                title: '32 teams, 32 bold predictions and breakout candidates: Our NFL team-by-team preview3dESPN NFL reporters, analystsESPN',
                surl: '/nfl/story/_/id/34502379/nfl-team-previews-2022-predictions-fantasy-breakout-players-depth-charts-power-rankings-picks',
            },
            {
                title: 'NFL quarterback projections for 2022: Best matchups, fantasy stars, stat leaders for all 272 games, plus an MVP top threeWe have predicted yards, touchdowns and passer rating from all 272 games, with highlights from the most anticipated matchups.4dMike ClayIllustration by Brian Stauffer',
                surl: '/espn/feature/story/_/id/34337333/nfl-quarterback-projections-2022-best-matchups-fantasy-stars-stat-leaders-all-272-games-plus-mvp-top-three',
            },
            {
                title: "Cardinals extend safety Thompson through '256dJosh WeinfussFrank Jansky/Icon Sportswire",
                surl: '/nfl/story/_/id/34509677/jalen-thompson-extension-arizona-cardinals-includes-245-million-guaranteed-source-says',
            },
            {
                title: 'Raiders waive OL Leatherwood, trade CB Mullen9dPaul GutierrezEthan Miller/Getty Images',
                surl: '/nfl/story/_/id/34489485/las-vegas-raiders-waive-ol-alex-leatherwood-trade-cb-trayvon-mullen-arizona-cardinals',
            },
            {
                title: 'Ranking the top 100 NFL players for this season: The best of the best, starting with Mahomes11dESPN NFL Nation reportersESPN',
                surl: '/nfl/story/_/id/34459811/nfl-rank-2022-predicting-top-100-players-stats-notes-quotes-league-best-including-patrick-mahomes-no-1',
            },
        ];
        // const articles = await getLinks(url);
        // console.log('route articles: ' + articles);
        getLinks(url)
            .then((articles) => {
                //console.log('look here: ' + articles);
                res.render('article', {
                    ...array,
                    loggedIn: req.session.loggedIn,
                });
            })
            .catch((err) => console.error('issue with promise', err));
        // const articlePromise = new Promise((resolve, reject) => {

<<<<<<< HEAD
        // var teamArticles =  getLinks(url)


        const articlePromise = new Promise((resolve, reject) => {
            return getLinks(url);
          });

          articlePromise.then((articlePromise) => {

            res.render('article', {
                ...articlePromise,
                loggedIn: req.session.loggedIn,
            });

          })
        //  console.log(cheerioData);


=======
        //     resolve(articles);
        // }).then((articlePromise) => {
        //     console.log('Article Promise: ' + articlePromise);

        //     res.render('article', {
        //         ...articlePromise,
        //         loggedIn: req.session.loggedIn,
        //     });
        // });
>>>>>>> 131694c018b9076526bc234771bda5c13adc4054
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile/:email', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne(
            { where: { email: req.params.email } },
            {
                attributes: { exclude: ['password'] },
                include: [{ model: FanScore, RecentArticle, SavedArticle, Team }],
            }
        );

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
