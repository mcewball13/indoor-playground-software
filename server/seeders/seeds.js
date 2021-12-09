const faker = require("faker");

const db = require("../config/connection");
const { MainCompany, Employee } = require("../models");

db.once("open", async () => {
    await MainCompany.deleteMany({});

    const mainCompanyData = [];

    //Create rooms
    for (let i = 0; i < 25; i++) {
        const companyDescription = faker.lorem.words(
            Math.round(Math.random() * 20) + 1
        );
        const companyName = faker.company.companyName();
        const addressStreet = faker.address.streetName();
        const addressCity = faker.address.city();
        const addressState = faker.address.state();
        const addressZip = faker.address.zipCode();
        const companyMainPhone = faker.phone.phoneNumber();

        mainCompanyData.push({
            companyDescription,
            companyName,
            addressStreet,
            addressCity,
            addressState,
            addressZip,
            companyMainPhone,
        });
    }
    await MainCompany.insertMany(mainCompanyData);

    await Employee.deleteMany({});

    const employeeData = [];

    for (let i = 0; i < 25; i++) {
      const username = faker.internet.userName()
      const email = faker.internet.email();
      const password = faker.internet.password(); 

      employeeData.push({username, email, password})

      await Employee.insertMany(employeeData)
      
    }

    console.log("all done!");
    process.exit(0);
});
