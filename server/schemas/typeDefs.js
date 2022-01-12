const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth{
    token: ID!
    employee: Employee
  }
  type CustomerGuardians {
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
    allCustomers: [CustomerGuardians]
    singleCustomer(id: ID!): CustomerGuardians 
    allEmployees: [Employee]
  }
  type Mutation{
    addUser(input: AddEmployeeFieldsInput): Auth
    loginUser(email: String, password: String): Employee
    
  }
`;

module.exports = typeDefs;
