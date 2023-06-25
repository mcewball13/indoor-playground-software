const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection').default;
const moment = require('moment');

const momentDate = moment().format('MMM Do YYYY');

class EmployeeRoles extends Model {}

EmployeeRoles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleTitle: {
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
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee_roles',
  }
);

module.exports = EmployeeRoles;
