const seedGuardians = require("./guardianSeed")
const seedCompanies = require("./companySeed")
const seedLocations = require("./locationSeed")
const seedMinors = require("./minorSeed")
const seedGuardiansMinors = require("./guardianMinorSeed")
const seedRoles = require("./rolesSeed")
const seedEmployees = require("./employeeSeed")

const sequelize = require("../config/connection");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log("=============");
    await seedCompanies();
    console.log("=============");
    await seedLocations();
    console.log("=============");
    await seedMinors();
    console.log("============="); 
    await seedGuardians();
    console.log("=============");
    await seedGuardiansMinors();
    console.log("=============");
    await seedRoles();
    console.log("=============");
    await seedEmployees();
    console.log("=============");
    
    process.exit(0);
};

seedAll();
