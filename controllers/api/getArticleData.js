const mysql = require("../../config/connection");
const cheerio = require("cheerio");
const axios = require('axios');




const url = 'https://www.espn.com/nfl/team/_/name/det/detroit-lions';
const articles = [];

function getLinks(url){
axios.get(url)
.then(response => {
    const html = response.data
    const $ = cheerio.load(html)

    $(`a[href*=/story/]`, html).each(function () {

        const title = $(this).text();
        const surl = $(this).attr('href');

        articles.push({
            title,
            surl
        })

        console.log(`Test this: ${articles}`);
    })
})
// return articles;

};

// app.get('/', function (req, res) {
//     getLinks(url);

// });

   
  getLinks(url);