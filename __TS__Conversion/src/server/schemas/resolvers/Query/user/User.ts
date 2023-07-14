import { IResolvers } from '@graphql-tools/utils';
import { CustomerGuardian, Employees, EmployeeRoles, Locations } from 'src/server/models';

const UserQueries: IResolvers = {
  allEmployees: async (parent: unknown, args: Record<string, any>, context: any) => {
    try {
      const guardianData = await Employees.findAll({});
      console.log(guardianData);
      return guardianData;
    } catch (error) {
      console.log(error);
    }
  },
  getRoles: async (parent: unknown, args: Record<string, any>, context: any) => {
    try {
      const roleData = await EmployeeRoles.findAll({});
      return roleData;
    } catch (error) {
      console.log(error);
    }
  },
  addEmployeeFormFill: async (parent: unknown, args: Record<string, any>, context: any) => {
    try {
      const formFillData = await Employees.findAll({
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Locations,
            attributes: ['locationName'],
          },
          {
            model: EmployeeRoles,
            attributes: ['roleTitle'],
          },
        ],
      });
      console.log(formFillData);
      return formFillData;
    } catch (error) {
      console.log(error);
    }
  },
};

export default UserQueries;
