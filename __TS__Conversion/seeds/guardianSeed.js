const { CustomerGuardian } = require('../server/models');
const { faker } = require('@faker-js/faker');

const _GUARDIANS = [];

for (let i = 0; i < 8000; i++) {
  _GUARDIANS.push({
    guardianFirstName: faker.person.firstName(),
    guardianLastName: faker.person.lastName(),
    displayName: faker.person.fullName(),
    birthday: faker.date.past({ years: 50, refDate: new Date('04/04/2000') }),
    password: faker.internet.password(),
    email: faker.internet.email(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    storedValue: faker.finance.amount(1, 200, 2),
    notes: faker.lorem.paragraph(3),
    isAccountOwner: true,
    membership_id: Math.floor(Math.random() * 4 + 1),
    company_id: Math.floor(Math.random() * 7 + 1),
    locations_id: Math.floor(Math.random() * 4 + 1),
  });
}

const seedGuardians = () => CustomerGuardian.bulkCreate(_GUARDIANS);

module.exports = seedGuardians;
