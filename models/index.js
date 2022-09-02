const User = require('./User');
const Team = require('./Team');
const Article = require('./Article');
const FanScore = require('./Fanscore');
const Source = require('./Source');
const SavedArticle = require('./SavedArticle');
const RecentArticle = require('./RecentArticle');

// A team can have many users
Team.hasMany(User, {
    foreignKey: 'favorite_team_id',
    onDelete: 'CASCADE',
});

// A user belongs to a single team
User.belongsTo(Team, {
    foreignKey: 'favorite_team_id',
});

// A user can have many saved articles
User.hasMany(SavedArticle, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// A saved article belongs to a single user
SavedArticle.belongsTo(User, {
    foreignKey: 'user_id',
});

// A user can have many recent articles
User.hasMany(RecentArticle, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// A recent article belongs to a single user
RecentArticle.belongsTo(User, {
    foreignKey: 'user_id',
});

// A fanscore can have many users
FanScore.hasMany(User, {
    foreignKey: 'fanscore_id',
    onDelete: 'CASCADE',
});

// A user belongs to a single fanscore
User.belongsTo(FanScore, {
    foreignKey: 'fanscore_id',
});

module.exports = { User, Team, Article, FanScore, Source, SavedArticle, RecentArticle };
