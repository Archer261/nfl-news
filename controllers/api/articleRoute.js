const router = require("express").Router();
const bcrypt = require("bcrypt");
const getLinks = require('../../')
const User = require("../../models/User");
const Article = require("../../models/Article")
const Source = require("../../models/Source")
const Team = require('../../models/Team')


// const teams = [];

function doesThisWork(Team) {
const teamName = Team.team_name;
const teamNameUrl = Team.location_abbr + '/' + Team.location + Team.team_name;

console.log(teamNameUrl);

}
// console.log(team_name);

// router.get(`/${teamName}`, async (req, res) => {
//     try {
//         const dbUserData = await Tes.create({
           
//         });

//         req.session.save(() => {
//             req.session.loggedIn = true;

//             res.status(200).json(dbUserData);


//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

doesThisWork(Team);

module.exports = router;
