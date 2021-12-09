const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class PostTags extends Model {}

PostTags.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'posttags'
    }
    )

    module.exports = PostTags;
    