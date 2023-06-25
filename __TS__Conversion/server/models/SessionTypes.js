const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

const date = new Date();

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
    daysOfWeek: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    startDateTime: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue: date.toISOString(),
    },
    endDateTime: {
      type: DataTypes.DATE(),
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
