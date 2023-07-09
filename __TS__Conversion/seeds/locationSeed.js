const { Locations } = require('../server/models');
const { faker } = require('@faker-js/faker');

const _LOCATIONS = [];

for (let i = 0; i < 4; i++) {
  _LOCATIONS.push({
    locationName: faker.company.bsNoun(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    company_id: Math.floor(Math.random() * 7 + 1),
  });
}

const seedLocations = () => Locations.bulkCreate(_LOCATIONS);

module.exports = seedLocations;
