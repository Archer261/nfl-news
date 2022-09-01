const sequelize = require("../config/connection");
const { Article, FanScore, Team, User, Source, SavedArticle, RecentArticle } = require("../models");

const articleData = require("./article-seeds.json");
const fanScoreData = require("./fanscore-seeds.json");
const teamData = require("./team-seeds.json");
const userData = require("./user-seeds.json");
const sourceData = require("./source-seeds.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Source.bulkCreate(sourceData, {
        individualHooks: true,
        returning: true,
    });

    await Team.bulkCreate(teamData, {
        individualHooks: true,
        returning: true,
    });

    await FanScore.bulkCreate(fanScoreData, {
        individualHooks: true,
        returning: true,
    });

    await Article.bulkCreate(articleData, {
        individualHooks: true,
        returning: true,
    });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();
