import { GraphQLError } from 'graphql';

import employeeQueries from './employeeResolvers/employeeResolverQueries';
import customerAuthMutations from './customerResolvers/auth/customerAuthMutationResolvers';
import customerQueryResolvers from './customerResolvers/customerQueryResolvers';
import {
  CustomerGuardian,
  CustomerMinor,
  CustomerGuardianHasCustomerMinor,
  Employees,
} from '../server/models';
import { signToken } from '../../src/utils/auth';

export const resolvers = {
  Query: {
    ...employeeQueries,
    ...customerQueryResolvers,

    allCustomers: async (parent: any, args: any, context: any) => {
      try {
        const guardianData = await CustomerGuardian.findAll({
          include: [
            {
              model: CustomerMinor,
              as: 'minors',
            },
          ],
        });
        return guardianData;
      } catch (error) {
        console.log(`error`);
      }
    },

    singleCustomer: async (parent: unknown, { id }: Record<string, any>, context: any) => {
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
    addUser: async (parents: unknown, { input }: any) => {
      console.log(input);
      const employee = await Employees.create(input);
      console.log(employee);
      const token = signToken(employee);

      return { token, employee };
    },
    loginUser: async (parents: unknown, { email, password }: Record<string, any>) => {
      // check to see if the email is found
      const userData = await Employees.findOne({
        where: {
          email: email,
        },
      });
      // check to see if the user exists
      if (!userData)
        throw new GraphQLError('Incorrect credentials, Please try again', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      // try to compare the password from the userData return
      const validPassword = userData.checkPassword(password);

      // if the password doesn't exist or is wrong throw error
      if (!validPassword)
        throw new GraphQLError('Incorrect credentials, Please try again', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });

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
