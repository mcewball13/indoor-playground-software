const { CustomerGuardian, Employee, EmployeeRoles, Locations } = require('../../server/models');

export default {
  allEmployees: async (parent: any, args: any, context: any) => {
    try {
      const guardianData = await Employee.findAll({});
      console.log(guardianData);
      return guardianData;
    } catch (error) {
      console.log(error);
    }
  },
  getRoles: async (parent: any, args: any, context: any) => {
    try {
      const roleData = await EmployeeRoles.findAll({});
      return roleData;
    } catch (error) {
      console.log(error);
    }
  },
  addEmployeeFormFill: async (parent: any, args: any, context: any) => {
    try {
      const formFillData = await Employee.findAll({
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
