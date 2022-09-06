const router = require("express").Router();
const bcrypt = require("bcrypt");
const { append } = require("cheerio/lib/api/manipulation");
const User = require("../../models/User");
const Team = require("../../models/Team");
const connection = require("mysql");

const teamTable = getElementById("teamTable");

function renderTeams(result) {
  createTeamIcons(result.logo_path);
}

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

con.connect(function (err) {
  if (err) throw err;

  con.query("SELECT * FROM teams", function (err, result, fields) {
    if (err) throw err;

    result.forEach(renderTeams(result));
  });
});

function createTeamIcons(logoPath) {
  var teamContainer = document.createElement("div").className("w-full rounded");
  var teamLogo = document
    .createElement("img")
    .setAttribute("class", "teamLogo")
    .setAttribute("src", `../assets/${logoPath}`)
    .setAttribute("alt", "image");
  teamContainer.appendElement(teamLogo);
  teamTable.appendElement(teamContainer);
  teamContainer.addEventListener("click", console.log("test"));
}

export default renderTeams();
