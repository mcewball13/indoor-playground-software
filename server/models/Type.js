const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Type extends Model {}

Type.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'type'
    }
)

module.exports = Type;
