const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Source extends Model {}

Source.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        source_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "source",
    }
);

module.exports = Source;
