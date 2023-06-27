const { Company } = require('../server/models');
const { faker } = require('@faker-js/faker');

const _COMPANIES = [];

for (let i = 0; i < 7; i++) {
  _COMPANIES.push({
    companyName: faker.company.name(),
    dateInBusiness: faker.date.past({years:50}),
    addressStreet: faker.location.streetAddress(),
    addressCity: faker.location.city(),
    addressState: faker.location.state({abbreviated: true}),
    addressZip: faker.location.zipCode(),
    addressPhone: faker.phone.number(),
  });
}

const seedCompanies = () => Company.bulkCreate(_COMPANIES);

module.exports = seedCompanies;
