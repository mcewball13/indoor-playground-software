const { Locations } = require("../models");
const {faker} = require("@faker-js/faker");


const locations = []

for (let i = 0; i < 4; i++) {
    locations.push(
        {
            locationName: faker.company.bsNoun(),
            addressStreet: faker.address.streetAddress(),
            addressCity: faker.address.cityName(),
            addressState: faker.address.stateAbbr(),
            addressZip: faker.address.zipCode(),
            addressPhone: faker.phone.number(),
            company_id: Math.floor((Math.random() * 7)+1)
        }
    )
    
}

const seedLocations =()=> Locations.bulkCreate(locations);

module.exports = seedLocations;
