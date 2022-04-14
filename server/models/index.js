const Company = require("./Company");
const Locations = require("./Location");
const CustomerGuardian = require("./CustomerGuardian");
const CustomerMinor = require("./CustomerMinor");
const CustomerGuardianHasCustomerMinor = require("./CustomerGuardianHasCustomerMinor");
const Employees = require("./Employees");
const EmployeeRoles = require("./EmployeeRoles");
const Memberships = require("./Memberships");
const SignedWaivers = require("./SignedWaivers");

// Create associations with the main company
Company.hasMany(Locations, {
    foreignKey: "company_id",
});
Locations.hasMany(CustomerGuardian, {
    foreignKey: "locations_id",
});
Company.hasMany(CustomerGuardian, {
    foreignKey: "company_id",
    onDelete: "cascade",
});
Locations.hasMany(CustomerMinor, {
    foreignKey: "locations_id",
});
Company.hasMany(CustomerMinor, {
    foreignKey: "company_id",
});

Locations.hasMany(EmployeeRoles, {
    foreignKey: "location_id",
    unique: false,
});

// create employee relationships

Locations.hasMany(Employees, {
    foreignKey: "location_id",
});

Employees.belongsTo(EmployeeRoles, {
    foreignKey: "role_id",
});
Memberships.hasMany(CustomerGuardian, {
    foreignKey: "membership_id",
    unique: false,
})
CustomerGuardian.belongsTo(Memberships, {
    foreignKey: "membership_id",
    unique: false,
})

// Waiver relationships
SignedWaivers.belongsTo(CustomerGuardian, {
    foreignKey: "guardian_id",
    unique: false,
})
CustomerGuardian.hasMany(SignedWaivers, {
    foreignKey: "guardian_id",
    unique: false,
})
CustomerMinor.hasMany(SignedWaivers, {
    foreignKey: "minor_id",
    unique: false,
})
SignedWaivers.belongsTo(CustomerMinor, {
    foreignKey: "minor_id",
    unique: false,
})

// Create the many to many association with itself for account owners and other adults on the same account.

CustomerGuardian.belongsToMany(CustomerGuardian, {
    through: "customer_guardian_has_customer_guardian",
    as: "guardiansInGuardians",
    foreignKey: "guardian_id",
});

// Create the many to many relationship with guardians and minors

CustomerGuardian.belongsToMany(CustomerMinor, {
    through: {
        model: "customer_guardian_has_customer_minor",
        attributes: [],
        unique: false,
    },
    as: "minors",
    foreignKey: "guardian_id",
});
CustomerMinor.belongsToMany(CustomerGuardian, {
    through: {
        model: "customer_guardian_has_customer_minor",
        unique: false,
        attributes: [],
    },
    as: "guardians",
    foreignKey: "minor_id",
});

module.exports = {
    CustomerGuardian,
    CustomerMinor,
    Company,
    Locations,
    CustomerGuardianHasCustomerMinor,
    Employees,
    EmployeeRoles,
};
