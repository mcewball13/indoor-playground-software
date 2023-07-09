const { Company } = require('../server/models');
const { faker } = require('@faker-js/faker');

const _COMPANIES = [];

for (let i = 0; i < 7; i++) {
  _COMPANIES.push({
    companyName: faker.company.name(),
    dateInBusiness: faker.date.past({ years: 50 }),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
  });
}

const seedCompanies = () => Company.bulkCreate(_COMPANIES);

module.exports = seedCompanies;
