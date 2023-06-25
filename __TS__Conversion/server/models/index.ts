
// convert the above to import statement
import Company from './Company';
import Locations from './Location';
import CustomerGuardian from './CustomerGuardian';
import CustomerMinor from './CustomerMinor';
import CustomerGuardianHasCustomerMinor from './CustomerGuardianHasCustomerMinor';
import Employees from './Employees';
import EmployeeRoles from './EmployeeRoles';
import Memberships from './Memberships';
import SignedWaivers from './SignedWaivers';
import SessionProducts from './SessionProducts';
import SessionTypes from './SessionTypes';
import SessionSchedules from './SessionSchedules';
import ProductCategories from './ProductCategories';
import ProductImages from './ProductImages';
import ProductTag from './ProductTag';

// ===========================================================
// Create associations with the main company
// ===========================================================

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
    
});
Locations.hasMany(SessionProducts, {
    foreignKey: "locations_id", // This is to allow multiple products to be assigned to a location
    onDelete: "set null",
});

// ===========================================================
// create employee relationships
// ===========================================================

Locations.hasMany(Employees, {
    foreignKey: "location_id",
});

Employees.belongsTo(EmployeeRoles, {
    foreignKey: "role_id",
});
Memberships.hasMany(CustomerGuardian, {
    foreignKey: "membership_id",
});
CustomerGuardian.belongsTo(Memberships, {
    foreignKey: "membership_id",
});

// ===========================================================
// Waiver relationships
// ===========================================================

SignedWaivers.belongsTo(CustomerGuardian, {
    foreignKey: "guardian_id",
});
CustomerGuardian.hasMany(SignedWaivers, {
    foreignKey: "guardian_id",
});
CustomerMinor.hasMany(SignedWaivers, {
    foreignKey: "minor_id",
});
SignedWaivers.belongsTo(CustomerMinor, {
    foreignKey: "minor_id",
});

// ===========================================================
// Create the many to many association with itself for account owners and other adults on the same account.
// ===========================================================

CustomerGuardian.belongsToMany(CustomerGuardian, {
    through: "customer_guardian_has_customer_guardian",
    as: "guardiansInGuardians",
    foreignKey: "guardian_id",
});
// ===========================================================
// Create the many to many relationship with guardians and minors
// ===========================================================

CustomerGuardian.belongsToMany(CustomerMinor, {
    through: {
        model: CustomerGuardianHasCustomerMinor,
        unique: false,
    },
    as: "minors",
    foreignKey: "guardian_id",
});
CustomerMinor.belongsToMany(CustomerGuardian, {
    through: {
        model: CustomerGuardianHasCustomerMinor,
        unique: false,
    },
    as: "guardians",
    foreignKey: "minor_id",
});

// ===========================================================
//  Create the relationship with the session products
// ===========================================================
SessionSchedules.hasMany(SessionProducts, {
    foreignKey: "session_schedule_id",
    onDelete: "set null",
});
SessionProducts.belongsTo(SessionSchedules, {
    foreignKey: "session_schedule_id",
});
SessionProducts.hasMany(ProductImages, {
    foreignKey: "session_product_id",
    onDelete: "set null",
});
ProductCategories.hasMany(SessionProducts, {
    foreignKey: "category_id",
    onDelete: "set null",
});
ProductTag.belongsToMany(SessionProducts, {
    through: "session_product_has_product_tag",
    as: "sessionProducts",
    foreignKey: "product_tag_id",
});
SessionProducts.belongsToMany(ProductTag, {
    through: "session_product_has_product_tag",
    as: "productTags",
    foreignKey: "session_product_id",
});

// ===========================================================
// exports
// ===========================================================

export {
    Company,
    CustomerGuardian,
    CustomerGuardianHasCustomerMinor,
    CustomerMinor,
    Employees,
    EmployeeRoles,
    Locations,
    Memberships,
    SessionSchedules,
    SessionTypes,
    SessionProducts,
    ProductCategories,
    ProductImages,
};
