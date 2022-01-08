const { Location } = require("../models");
const faker = require("faker")

const locations = []

for (let i = 0; i < 4; i++) {
    locations.push(
        {
            locationName: faker.company.bsNoun(),
            addressStreet: faker.address.streetAddress(),
            addressCity: faker.address.cityName(),
            addressState: faker.address.stateAbbr(),
            addressZip: faker.address.zipCode(),
            addressPhone: faker.phone.phoneNumber(),
            company_id: Math.floor((Math.random() * 7)+1)
        }
    )
    
}

const seedLocations =()=> Location.bulkCreate(locations);

module.exports = seedLocations;
