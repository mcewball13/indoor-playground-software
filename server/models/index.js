const Company = require("./Company");
const Locations = require("./Locations");
const CustomerGuardian = require("./CustomerGuardian");
const CustomerMinor = require("./CustomerMinor");

// Create associations with the main company
Company.hasMany(Locations, {
    foreignKey: "company_id",
});
Locations.hasMany(CustomerGuardian, {
    foreignKey: "locations_id",
});
Company.hasMany(CustomerGuardian, {
    foreignKey: "company_id",
});
Locations.hasMany(CustomerMinor, {
    foreignKey: "locations_id",
});
Company.hasMany(CustomerMinor, {
    foreignKey: "company_id",
});

// Create the many to many relationship with guardians and minors

CustomerGuardian.belongsToMany(CustomerMinor, {
    through: "customer_guardian_has_customer_minor",
    as: "customers",
    foreignKey: "gurdian_id",
});
CustomerMinor.belongsToMany(CustomerGuardian, {
    through: "customer_guardian_has_customer_minor",
    as: "customers",
    foreignKey: "minor_id",
});



module.exports = {
    CustomerGuardian,
    CustomerMinor,
    Company,
    Locations
};
