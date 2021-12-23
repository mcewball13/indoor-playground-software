const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

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
        img_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "picture",
                key: "id",
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "type",
                key: "id",
            },
        },
        difficulty_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "difficulty",
                key: "id",
            },
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
