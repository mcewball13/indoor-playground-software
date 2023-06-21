const { CustomerGuardian, Employee } = require('../server/models');

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
};
