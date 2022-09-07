const mysql = require("../../config/connection");
const cheerio = require("cheerio");
const axios = require('axios');

const https = require('https');

const url = 'https://www.espn.com/nfl/team/_/name/det/detroit-lions';


const instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
  instance.get(url);
  
  // At request level
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  

const articles = [];

function getLinks(url){

    console.log('axios test: ----------------------------------------------------------------------------------------------------------------------------------------------------------');
    axios.get(url, { httpsAgent: agent })
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

        console.log(`Test this a test`);
    })

    console.log(articles);
})
return articles;

};

// app.get('/', function (req, res) {
//     getLinks(url);

// });

console.log('testhing console log');
  getLinks(url);