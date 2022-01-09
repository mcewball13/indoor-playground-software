const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type CustomerGuardians {
    id: ID
    firstName: String
  }
  type Query{
    allCustomers: [CustomerGuardians]
    singleCustomer(id: ID!): CustomerGuardians
    
  }
`;

module.exports = typeDefs;
