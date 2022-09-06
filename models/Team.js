const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Team extends Model {}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        team_name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location_abbr: {
            type: DataTypes.STRING,
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
        modelName: 'team',
    }
);

module.exports = Team;
