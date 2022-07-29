const { CustomerGuardian, Employee } = require('../server/models');

module.exports = {
  allEmployees: async (parent, args, context) => {
    try {
      const guardianData = await Employee.findAll({});
      console.log(guardianData);
      return guardianData;
    } catch (error) {
      console.log(error);
    }
  },
};
