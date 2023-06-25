import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection';

class CustomerGuardianHasCustomerMinor extends Model {}

CustomerGuardianHasCustomerMinor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'customer_guardian_has_customer_minor',
  }
);

export default CustomerGuardianHasCustomerMinor;
