const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class WaiverTemplates extends Model {}

WaiverTemplates.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    waiverName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
    waiverContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    waiverLogo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    configSigningRequirements: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    configMinimumSigningAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    configIsEmailOptOutOnWaiver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    configIsRequirePinLoadData: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    configIsAddAdultButton: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    configIsLinkWillExpireWaiver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    configDaysToExpireWaiverLink: {
      type: DataTypes.INTEGER,
    },
    configDaysWaiverWillExpire: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 365,
    },
    configIsRemovedSignatureBlock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    configIsVideo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    configIsVideoLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    configConfirmWatchedVideo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    configIsWatchFullVideo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    fieldsstreet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    fieldscity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    fieldsstate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    fieldszipCode: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'waiver_templates',
  }
);

module.exports = WaiverTemplates;
