const { CustomerGuardianHasCustomerMinor } = require("../models");
const faker = require("faker");

const guardians = [];

for (let i = 0; i < 1500; i++) {
    guardians.push({
        guardian_id: Math.floor(Math.random() * 1000 + 1),
        minor_id: Math.floor(Math.random() * 1000 + 1),
    });
}

const seedGuardiansMinors = () => {
    try {
      return CustomerGuardianHasCustomerMinor.bulkCreate(guardians);
    } catch (error) {
        console.log(error);
    }
};

module.exports = seedGuardiansMinors;
