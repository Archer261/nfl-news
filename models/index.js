const User = require("./User");
const Team = require("./Team");
const Article = require("./Article");
const FanScore = require("./Fanscore");
const Source = require("./Source");
const SavedArticle = require("./SavedArticle");
const RecentArticle = require("./RecentArticle");

User.belongsToMany(Article, {
    // Define the third table needed to store the foreign keys
    through: {
        model: SavedArticle,
        unique: false,
    },
    // Define an alias for when data is retrieved
    as: "user_saved_articles",
});

Article.belongsToMany(User, {
    // Define the third table needed to store the foreign keys
    through: {
        model: SavedArticle,
        unique: false,
    },
    // Define an alias for when data is retrieved
    as: "saved_articles",
});

User.belongsToMany(Article, {
    // Define the third table needed to store the foreign keys
    through: {
        model: RecentArticle,
        unique: false,
    },
    // Define an alias for when data is retrieved
    as: "user_recent_articles",
});

Article.belongsToMany(User, {
    // Define the third table needed to store the foreign keys
    through: {
        model: RecentArticle,
        unique: false,
    },
    // Define an alias for when data is retrieved
    as: "recent_articles",
});

// A team can have many articles
Team.hasMany(Article, {
    foreignKey: "team_id",
    onDelete: "CASCADE",
});

// An article belongs to a single team
Article.belongsTo(Team, {
    foreignKey: "team_id",
});

// A source can have many articles
Source.hasMany(Article, {
    foreignKey: "source_id",
    onDelete: "CASCADE",
});

// A article belongs to a single source
Article.belongsTo(Source, {
    foreignKey: "source_id",
});

// A fanscore can have many users
FanScore.hasMany(User, {
    foreignKey: "fanscore_id",
    onDelete: "CASCADE",
});

// A user belongs to a single fanscore
User.belongsTo(FanScore, {
    foreignKey: "fanscore_id",
});

// A team can have many users
Team.hasMany(User, {
    foreignKey: "favorite_team_id",
    onDelete: "CASCADE",
});

// A user belongs to a single team
User.belongsTo(Team, {
    foreignKey: "favorite_team_id",
});

module.exports = { User, Team, Article, FanScore, Source, SavedArticle, RecentArticle };
