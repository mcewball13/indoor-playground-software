const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const moment = require("moment");

const momentDate = moment().format("MMM Do YYYY")

class Memberships extends Model {}

Memberships.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        description: {
            type: DataTypes.STRING(2000),
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        thumbnail: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: momentDate.add(1, 'M'),
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "memberships",
    }
);

module.exports = Memberships;
