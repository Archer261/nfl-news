const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class FanScore extends Model {}

FanScore.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        tier_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        min_articles: {
            type: DataTypes.INTEGER,
        },
        logo_path: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "fanscore",
    }
);

module.exports = FanScore;
