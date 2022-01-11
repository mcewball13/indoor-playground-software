const { CustomerGuardian } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
 
    allCustomers: async (parent, args, context) => {
      try {
        const guardianData = await CustomerGuardian.findAll({})
        console.log(guardianData);
        return guardianData;
        
      } catch (error) {
        console.log(error)
      }
    },

    singleCustomer: async (parent, {id}, context) => {
      try {

        const customer = await CustomerGuardian.findByPk(id)
        return customer;
      } catch (error) {
        console.log(error);
            console.log(error)
      }
    }

    
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
