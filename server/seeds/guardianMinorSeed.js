const { CustomerGuardianHasCustomerMinor } = require("../models");
const faker = require("faker")

const guardians = []

for (let i = 0; i < 60; i++) {
    guardians.push(
        {
            guardian_id: Math.floor((Math.random() * 50)+1),
            minor_id: Math.floor((Math.random() * 50)+1),
        }
    )
    
}

const seedGuardiansMinors =()=> CustomerGuardianHasCustomerMinor.bulkCreate(guardians);

module.exports = seedGuardiansMinors;
