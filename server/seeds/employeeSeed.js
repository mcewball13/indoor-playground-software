const { Employees } = require("../models");

const defaultEmployee = {
    username: "demoAdmin",
    email: "demo@minimals.cc",
    password: "demo1234",
    firstName: "Demo",
    lastName: "Admin",
};

const seedEmployees = () => {
    try {
        return Employees.create(defaultEmployee);
    } catch (error) {
        console.log(error);
    }
};

module.exports = seedEmployees;
