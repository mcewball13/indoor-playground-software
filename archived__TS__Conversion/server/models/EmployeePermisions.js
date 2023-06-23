const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const moment = require("moment");

const momentDate = moment().format("MMM Do YYYY")

class EmployeePermissions extends Model {}

EmployeePermissions.init(
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
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        isRenewable: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        renewalPrice: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        minLengthInMonths: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
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
        modelName: "employee_permissions",
    }
);

module.exports = EmployeePermissions;
