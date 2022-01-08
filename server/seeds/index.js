const seedGuardians = require("./guardianSeed")
const seedCompanies = require("./companySeed")
const seedLocations = require("./locationSeed")

const sequelize = require("../config/connection");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log("=============");
    await seedCompanies();
    console.log("=============");
    await seedLocations();
    console.log("=============");
    await seedGuardians();
    console.log("=============");
    
    process.exit(0);
};

seedAll();
