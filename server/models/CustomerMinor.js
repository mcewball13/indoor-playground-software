const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CustomerMinor extends Model {}

CustomerMinor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    minorFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minorLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minorBirthday: {
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
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'customer_minor',
  }
);

module.exports = CustomerMinor;
