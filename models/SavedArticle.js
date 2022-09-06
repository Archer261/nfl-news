const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SavedArticle extends Model {}

SavedArticle.init(
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
                model: 'user',
                key: 'id',
            },
        },
        title: {
            type: DataTypes.STRING,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'savedarticle',
    }
);

module.exports = SavedArticle;
