import { GraphQLError } from "graphql";
import { Employees } from "src/server/models";
import { auth } from "src/utils/auth";

const mutation = {
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
    const token = auth.signToken(employee);
    // return the token and the employee object to match the Auth type in typeDefs
    return { token, employee };
  },
};

export default mutation;