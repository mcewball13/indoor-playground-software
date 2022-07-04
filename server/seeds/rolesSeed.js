const { EmployeeRoles } = require("../models");
const {faker} = require("@faker-js/faker");


const roles = []

for (let i = 0; i < 4; i++) {
    roles.push(
        {
            roleTitle: faker.commerce.department(),
            description: faker.lorem.lines(1),
            thumbnail: faker.image.image(),
            isActive: faker.helpers.arrayElement([true, false]),
            
        }
    )
    
}

const seedRoles =()=> {
    try {
       return EmployeeRoles.bulkCreate(roles)
        
    } catch (error) {
        console.log(error)        
    }
};

module.exports = seedRoles;
