const { CustomerGuardian } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
 
    allCustomers: async (parent, args, context) => {
        const guardianData = await CustomerGuardian.findAll({})
        console.log(guardianData);
        return guardianData;
    },

    
  },
  // Mutation: {
    //create user data
    // addUser: async (parents, args) => {
    //   const employee = await Employee.create(args);
    //   console.log(employee);
    //   const token = signToken(employee);

    //   return { token, employee};
    // },
  // }
}


module.exports = resolvers;
