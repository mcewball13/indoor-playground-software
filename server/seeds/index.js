const seedGuardians = require("./guardianSeed")

const sequelize = require("../config/connection");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log("=============");
    await seedGuardians();
    console.log("=============");
    
    process.exit(0);
};

seedAll();
