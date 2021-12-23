const {CustomerGuardian } = require("../models");
const faker = require("faker")

const guardians = []

for (let i = 0; i < 50; i++) {
    guardians.push(
        {
            firs_name: faker.name.firstName(),
            las_name: faker.name.lastName(),
            birthdate: faker.date.past(),
            email: faker.internet.email(),
            address_street: faker.address.streetAddress(),
            addres_city: faker.address.cityName(),
            addres_state: faker.address.stateAbbr(),
            addres_zip: faker.address.zipCode(),
            address_phone: faker.phone.phoneNumber(),
            stored_value: faker.finance.amount(),
            notes: faker.lorem.paragraph(3),
            is_account_owner: true
        }
    )
    
}

const seedGuardians =()=> CustomerGuardian.bulkCreate(guardians);

module.exports = seedGuardians;
