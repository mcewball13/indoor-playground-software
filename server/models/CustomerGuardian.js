const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class CustomerGuardian extends Model {}

CustomerGuardian.init( 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, 
            }
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
        },
        storedValue: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
        },
        isAccountOwner: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'customer_guardian'
    }
)

module.exports = CustomerGuardian;