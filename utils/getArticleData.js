const mysql = require('../config/connection');
const source = require('../models/Source');
const article = require('../models/Article');
const cheerio = require('cheerio');
const axios = require('axios');

const https = require('https');
const { resolve } = require('path');
const { rejects } = require('assert');

const url = 'https://www.espn.com/nfl/team/_/name/det/detroit-lions';
// const url = 'https://www.espn.com/nfl/team/_/name/{testamname}'; <--- need to import table data

//Container for list of articles

// Create function to extract article links and data from website
function getLinks(url) {
    const articles = [];

    // SSL cert bypass for Axios
    var instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });
    instance.get(url);

    // At request level
    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    // End of SSL cert bypass for Axios

    new Promise((resolve, reject) => {
        axios.get(url, { httpsAgent: agent }).then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            //Scape from article link within the pages' HTML
            $(`a[href*=/story/]`, html).each(function () {
                const title = $(this).text();
                const surl = $(this).attr('href');
                console.log('getSingleArticleTitle: ' + $(this).text());
                articles.push({
                    title,
                    surl,
                });
                //console.log('getArticles: ' + articles);
                //return articles;
            });
            console.log('getArticleData: ' + JSON.stringify(articles));
            console.log('array length: ' + articles.length);
            const articleResponse = [
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
            articles.length === 0 ? reject(new Error('No articles found')) : resolve(articleResponse);
        });
        //console.log('getArticles3: ' + JSON.stringify(articles));
        //return articles;
    });
}

// app.get('/', function (req, res) {
//     getLinks(url);

// });

// console.log('testhing console log');
// getLinks(url);

module.exports = getLinks;
