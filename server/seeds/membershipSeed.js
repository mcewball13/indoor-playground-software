const Memberships = require("../models/Memberships");
const {faker} = require("@faker-js/faker");



const memberships = []
const membershipName = ["Summer Pass", "Family", "Single", false]

for (let i = 0; i < 4; i++) {
    memberships.push(
        {
            title: faker.helpers.arrayElement(membershipName),
            description: faker.lorem.lines(1),
            isActive: true,
            
        }
    )
    
}

const seedMemberships =()=> {
    try {
       return Memberships.bulkCreate(memberships)
        
    } catch (error) {
        console.log(error)        
    }
};

module.exports = seedMemberships;
