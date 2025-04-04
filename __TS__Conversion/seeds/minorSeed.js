const { CustomerMinor } = require('../src/server/models');
const { faker } = require('@faker-js/faker');

const _MINORS = [];

for (let i = 0; i < 8000; i++) {
  _MINORS.push({
    minorFirstName: faker.person.firstName(),
    minorLastName: faker.person.lastName(),
    minorBirthday: faker.date.past({ years: 12, refDate: new Date() }),
    email: faker.internet.email(),
    notes: faker.lorem.paragraph(3),
    company_id: Math.floor(Math.random() * 7 + 1),
    locations_id: Math.floor(Math.random() * 4 + 1),
  });
}

const seedMinors = () => CustomerMinor.bulkCreate(_MINORS);

module.exports = seedMinors;
