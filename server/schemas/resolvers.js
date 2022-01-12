const { CustomerGuardian, Employee } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        allEmployees: async (parent, args, context) => {
            try {
                const guardianData = await Employee.findAll({});
                console.log(guardianData);
                return guardianData;
            } catch (error) {
                console.log(error);
            }
        },

        allCustomers: async (parent, args, context) => {
            try {
                const guardianData = await CustomerGuardian.findAll({});
                console.log(guardianData);
                return guardianData;
            } catch (error) {
                console.log(error);
            }
        },

        singleCustomer: async (parent, { id }, context) => {
            try {
                const customer = await CustomerGuardian.findByPk(id);
                return customer;
            } catch (error) {
                console.log(error);
                console.log(error);
            }
        },
    },
    Mutation: {
        // create user data
        addUser: async (parents, { input }) => {
            console.log(input);
            const employee = await Employee.create(input);
            console.log(employee);
            const token = signToken(employee);

            return { token, employee };
        },
        loginUser: async (parents, { email, password }) => {
            // check to see if the email is found
            const userData = await Employee.findOne({
                where: {
                    email: email,
                },
            });
            if (!userData)
                throw new AuthenticationError(
                    "Incorrect credentials, Please try again"
                );

            const validPassword = userData.checkPassword(password);

            if (!validPassword)
                throw new AuthenticationError(
                    "Incorrect credentials, Please try again"
                );

            const employee = await userData.get({ plain: true });

            console.log(employee);

            const token = signToken(employee);

            return { token, employee };
        },
    },
};

module.exports = resolvers;
