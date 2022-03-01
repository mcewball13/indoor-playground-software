const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt")

class Employee extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preferredName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        addressStreet: {
            type: DataTypes.STRING,
            allowNull: true
        },
        addressCity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        addressState: {
            type: DataTypes.STRING,
            allowNull: true
        },
        addressZip: {
            type: DataTypes.STRING,
            allowNull: true
        },
        addressPhone: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        hooks: {
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser
            },
            async beforeUpdate(updatedUser) {
                updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                return updatedUser

            }
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "employee",
    }
);

module.exports = Employee;
