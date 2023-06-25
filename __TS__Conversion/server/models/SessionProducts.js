const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection').default;
const moment = require('moment');

const momentDate = moment().format('MMM Do YYYY');

class SessionProducts extends Model {}

SessionProducts.init(
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
    isConsumable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    autoConsumable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    termsAndConditions: {
      type: DataTypes.TEXT,
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
    modelName: 'session_products',
  }
);

module.exports = SessionProducts;
