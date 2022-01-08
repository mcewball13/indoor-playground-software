const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

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
            },
        },
        addressStreet: {
            type: DataTypes.STRING,
        },
        addressCity: {
            type: DataTypes.STRING,
        },
        addressState: {
            type: DataTypes.STRING,
        },
        addressZip: {
            type: DataTypes.STRING,
        },
        addressPhone: {
            type: DataTypes.STRING,
        },
        storedValue: {
            type: DataTypes.FLOAT,
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
        modelName: "customer_guardian",
    }
);

module.exports = CustomerGuardian;
