const router = require('express').Router();
const bcrypt = require('bcrypt');
//const { append } = require("cheerio/lib/api/manipulation");
const User = require('../../models/User');
const Team = require('../../models/Team');
const connection = require('../../config/connection');
const axios = require('axios');

//const teamTable = getElementById('teamTable');

function renderTeams(result) {
    createTeamIcons(result.logo_path);
}

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "",
// });

module.exports = router;
