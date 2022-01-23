const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth{
    token: ID!
    employee: Employee
  }
  type CustomerGuardian {
    id: ID!
    firstName: String!
    lastName: String!
  }
  type Employee {
    id: ID!
    username: String!
    lastName: String!
    firstName: String!
    email: String!
    password: String!
    preferredName: String
    addressStreet: String
    addressCity: String
    addressState: String
    addressZip: String
    addressPhone: String
  }
  type Role {
    id: ID!
    roleTitle: String!
    description: String
    thumbnail: String
    isActive: Boolean!
  }
  type Locations {
    id: ID!
    locationName: String!
    addressStreet: String!
    addressCity: String!
    addressState: String!
    addressZip: String!
    addressPhone: String!
  }
  type EmployeeForm {
    roles: [Role]
    locations: [Locations]
  }
  input AddEmployeeFieldsInput {
    username: String!
    lastName: String!
    firstName: String!
    email: String!
    password: String!
    preferredName: String
    addressStreet: String
    addressCity: String
    addressState: String
    addressZip: String
    addressPhone: String
  }
  type Query{
    allCustomers: [CustomerGuardian]
    singleCustomer(id: ID!): CustomerGuardian 
    allEmployees: [Employee]
    getRoles: [Role]
    addEmployeeFormFill: EmployeeForm
  }
  type Mutation{
    addUser(input: AddEmployeeFieldsInput): Auth
    loginUser(email: String, password: String): Auth
    
  }
`;

module.exports = typeDefs;
