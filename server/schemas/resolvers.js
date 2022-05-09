const { AuthenticationError } = require("apollo-server-express");

const employeeQueries = require('./employeeResolvers/employeeResolverQueries')
const customerAuthMutations = require('./customerResolvers/auth/customerAuthMutationResolvers')
const customerQueryResolvers = require('./customerResolvers/customerQueryResolvers')
const { CustomerGuardian, CustomerMinor, CustomerGuardianHasCustomerMinor, Employee } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        ...employeeQueries,
        ...customerQueryResolvers,

        allCustomers: async (parent, args, context) => {
            try {
                const guardianData = await CustomerGuardian.findAll({
                    include: [
                        {
                            model: CustomerMinor,
                            through: {
                                model: CustomerGuardianHasCustomerMinor,
                                attributes: [],
                            },
                            as: "minors",
                        },
                    ],
                });
                return guardianData;
            } catch (error) {
                console.log(`error`);
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

        ...customerAuthMutations,
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
            // check to see if the user exists
            if (!userData)
                throw new AuthenticationError(
                    "Incorrect credentials, Please try again"
                );
            // try to compare the password from the userData return
            const validPassword = userData.checkPassword(password);

            // if the password doesn't exist or is wrong throw error
            if (!validPassword)
                throw new AuthenticationError(
                    "Incorrect credentials, Please try again"
                );

            // create the employee object from the return if no errors
            const employee = await userData.get({ plain: true });
            // sign token with employee object
            // do we need all the info or just username and PW in the token?
            const token = signToken(employee);
            // return the token and the employee object to match the Auth type in typeDefs
            return { token, employee };
        },
    },
};

module.exports = resolvers;