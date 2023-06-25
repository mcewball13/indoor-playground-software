const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection').default;
const moment = require('moment');

const momentDate = moment().format('MMM Do YYYY');

class SessionTypes extends Model {}

SessionTypes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    notes: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    expireType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    daysToExpire: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
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
    modelName: 'session_types',
  }
);

module.exports = SessionTypes;
