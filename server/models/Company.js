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
        address_street: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        address_city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address_state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address_zip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address_phone: {
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