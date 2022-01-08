const { Company } = require("../models");
const faker = require("faker")

const companies = []

for (let i = 0; i < 7; i++) {
    companies.push(
        {
            companyName: faker.company.companyName(),
            dateInBusiness: faker.date.past(50),
            addressStreet: faker.address.streetAddress(),
            addressCity: faker.address.cityName(),
            addressState: faker.address.stateAbbr(),
            addressZip: faker.address.zipCode(),
            addressPhone: faker.phone.phoneNumber(),
        }
    )
    
}

const seedCompanies =()=> Company.bulkCreate(companies);

module.exports = seedCompanies;
