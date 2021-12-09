const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Company extends Model {
    
}

Company.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressStreet: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        addressCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressState: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressZip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressPhone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'company'
    }
)

module.exports = Company;