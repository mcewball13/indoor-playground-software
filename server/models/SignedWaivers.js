const { Model, DataTypes} = require("sequelize")
const sequelize = require("../config/connection");


class SignedWaivers extends Model {}

SignedWaivers.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        waiverURL: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
       
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "signed_waivers",
    }
);

module.exports = SignedWaivers;

