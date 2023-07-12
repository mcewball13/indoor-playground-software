const { CustomerGuardian } = require('../server/models');
const { faker } = require('@faker-js/faker');

const _GUARDIANS = [];

for (let i = 0; i < 8; i++) {
  _GUARDIANS.push({
    guardianFirstName: faker.person.firstName(),
    guardianLastName: faker.person.lastName(),
    displayName: faker.person.fullName(),
    birthday: faker.date.past({ years: 50, refDate: new Date('04/04/2000') }),
    password: faker.internet.password(),
    email: faker.internet.email(),
    addressStreet: faker.location.streetAddress(),
    addressCity: faker.location.city(),
    addressState: faker.location.state({ abbreviated: true }),
    addressZip: faker.location.zipCode(),
    addressPhone: faker.phone.number(),
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
