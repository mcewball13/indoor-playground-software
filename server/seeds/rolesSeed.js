const { EmployeeRoles } = require("../models");
const faker = require("faker")

const roles = []

for (let i = 0; i < 4; i++) {
    roles.push(
        {
            roleTitle: faker.commerce.department(),
            description: faker.lorem.lines(1),
            thumbnail: faker.image.image(),
            isActive: faker.random.arrayElement([true, false]),
            
        }
    )
    
}

const seedRoles =()=> EmployeeRoles.bulkCreate(roles);

module.exports = seedRoles;
