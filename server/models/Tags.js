const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Tags extends Model {}

Tags.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'tags'
    }
)

module.exports = Tags;