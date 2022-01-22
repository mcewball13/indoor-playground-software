const { CustomerGuardian, Employee, EmployeeRoles} = require("../../models");

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
    getRoles: async (parent, args, context) => {
        try {
            const roleData = await EmployeeRoles.findAll({})
            return roleData
            
        } catch (error) {
            console.log(error)
        }
    }
}