const Customer = `#graphql

type CustomerAuth{
    customerAccessToken: ID!
    customer: CustomerGuardian
  }

  type CustomerMinor{
    id: ID!
    minorFirstName: String!
    minorLastName: String!
    minorBirthday: String!
    email: String
    notes: String
    createdAt: String
    updatedAt: String
  }

  type CustomerGuardian {
    id: ID!
    guardianFirstName: String!
    guardianLastName: String!
    email: String!
    displayName: String!
    birthday: String!
    street: String
    city: String
    state: String
    zipCode: String
    phoneNumber: String
    notes: String
    minors: [CustomerMinor]
  }

  type SignedWaiver {
    signedWaiverURL: String
    message: String
  }

  input RegisterNewCustomerInput {
    guardianFirstName: String
    guardianLastName: String
    email: String
    password: String
    birthday: String
    isBanned: Boolean
    # isAccountOwner: Boolean
    city: String
    state: String
    zipCode: String
    street: String
    phoneNumber: String
    photoURL: String
    status: String
    minorFirstName: String
    minorLastName: String
    minorBirthday: String
  }

  input RegisterNewMinorsInput {
    minorFirstName: String
    minorLastName: String
    minorBirthday: String
    email: String
  }

  extend type Query {
    allCustomers: [CustomerGuardian]
    allCustomersPaginated(page: Int!, limit: Int!): [CustomerGuardian]
    singleCustomer(id: ID!): CustomerGuardian
    customerAccountAutoSearch(filter: String!): [CustomerGuardian]
  }

  extend type Mutation {
    customerLogin(email: String!, password: String!): CustomerAuth
    customerRegister(guardians: RegisterNewCustomerInput, minors: [RegisterNewMinorsInput]): CustomerAuth
    submitSignedWaiver(signedWaiver: String, customerId: ID): SignedWaiver
  }

`;

export default Customer;