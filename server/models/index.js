const Company = require("./Company");
const Location = require("./Location");
const CustomerGuardian = require("./CustomerGuardian");
const CustomerMinor = require("./CustomerMinor");

// Create associations with the main company
Company.hasMany(Location, {
    foreignKey: "company_id",
});
Location.hasMany(CustomerGuardian, {
    foreignKey: "locations_id",
});
Company.hasMany(CustomerGuardian, {
    foreignKey: "company_id",
    onDelete: "cascade"
});
Location.hasMany(CustomerMinor, {
    foreignKey: "locations_id",
});
Company.hasMany(CustomerMinor, {
    foreignKey: "company_id",
});

// Create the many to many association with itself for account owners and other adults on the same account.

CustomerGuardian.belongsToMany(CustomerGuardian, {
    through: "customer_guardian_has_customer_guardian",
    as: "guardiansInGuardians",
    foreignKey: "gurdian_id",
});

// Create the many to many relationship with guardians and minors

CustomerGuardian.belongsToMany(CustomerMinor, {
    through: "customer_guardian_has_customer_minor",
    as: "guardians",
    foreignKey: "gurdian_id",
});
CustomerMinor.belongsToMany(CustomerGuardian, {
    through: "customer_guardian_has_customer_minor",
    as: "minors",
    foreignKey: "minor_id",
});



module.exports = {
    CustomerGuardian,
    CustomerMinor,
    Company,
    Location
};
