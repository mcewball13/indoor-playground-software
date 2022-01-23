const Company = require("./Company");
const Locations = require("./Location");
const CustomerGuardian = require("./CustomerGuardian");
const CustomerMinor = require("./CustomerMinor");
const CustomerGuardianHasCustomerMinor = require("./CustomerGuardianHasCustomerMinor");
const Employee = require("./Employee")
const EmployeeRoles = require("./EmployeeRoles")

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

// create employee relationships

Employee.hasOne(Locations, {
    foreignKey: "employee_id"
})

Locations.belongsTo(Employee, {
    foreignKey: "employee_id"
})
Employee.belongsTo(EmployeeRoles, {
    foreignKey: 'role_id'
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
        unique: false,
    },
    as: "guardians",
    foreignKey: "guardian_id",
});
CustomerMinor.belongsToMany(CustomerGuardian, {
    through: {
        model: "customer_guardian_has_customer_minor",
        unique: false,
    },
    as: "minors",
    foreignKey: "minor_id",
});

module.exports = {
    CustomerGuardian,
    CustomerMinor,
    Company,
    Locations,
    CustomerGuardianHasCustomerMinor,
    Employee,
    EmployeeRoles
};
