const mysql = require('../config/connection');
const source = require('../models/Source');
const article = require('../models/Article');
const cheerio = require('cheerio');
const axios = require('axios');

const https = require('https');

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

    return new Promise((resolve, reject) => {
        axios.get(url, { httpsAgent: agent }).then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            //Scape from article link within the pages' HTML
            $(`a[href*=/story/]`, html).each(function () {
                const title = $(this).text();
                const surl = $(this).attr('href');
                articles.push({
                    title,
                    surl,
                });
            });
            articles.length === 0 ? reject(new Error('No articles found')) : resolve(JSON.stringify(articles));
        });
    });
}

module.exports = getLinks;
