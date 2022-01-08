const {CustomerGuardian } = require("../models");
const faker = require("faker")

const guardians = []

for (let i = 0; i < 50; i++) {
    guardians.push(
        {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            birthdate: faker.date.past(),
            email: faker.internet.email(),
            addressStreet: faker.address.streetAddress(),
            addressCity: faker.address.cityName(),
            addressState: faker.address.stateAbbr(),
            addressZip: faker.address.zipCode(),
            addressPhone: faker.phone.phoneNumber(),
            storedValue: faker.finance.amount(),
            notes: faker.lorem.paragraph(3),
            isAccountOwner: true
        }
    )
    
}

const seedGuardians =()=> CustomerGuardian.bulkCreate(guardians);

module.exports = seedGuardians;
