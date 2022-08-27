const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class RecentArticle extends Model {}

RecentArticle.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "article",
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "recentarticle",
    }
);

module.exports = RecentArticle;
