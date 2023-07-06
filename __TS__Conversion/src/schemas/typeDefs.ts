const typeDefs = `#graphql
  type EmployeeAuth{
    token: ID!
    employee: Employee
  }
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
    minors: [CustomerMinor]
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
  type SignedWaiver {
    signedWaiverURL: String
    message: String
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
  input RegisterNewMinorsInput {
    minorFirstName: String
    minorLastName: String
    minorBirthday: String
    email: String
  }
  input RegisterNewCustomerInput {
    guardianFirstName: String
    guardianLastName: String
    email: String
    password: String
    birthday: String
    isBanned: Boolean
    # isAccountOwner: Boolean
    addressCity: String
    addressState: String
    addressZipCode: String
    addressStreet: String
    phoneNumber: String
    photoURL: String
    status: String
    minorFirstName: String
    minorLastName: String
    minorBirthday: String
  }

  type Query{
    allCustomers: [CustomerGuardian]
    singleCustomer(id: ID!): CustomerGuardian 
    allEmployees: [Employee]
    getRoles: [Role]
    addEmployeeFormFill: EmployeeForm
    emailExists(email: String!): Boolean
    userAccountAutoSearch(filter: String!): [CustomerGuardian]
  }
  type Mutation{
    customerLogin(email: String!, password: String!): CustomerAuth
    addUser(input: AddEmployeeFieldsInput): EmployeeAuth
    loginUser(email: String, password: String): EmployeeAuth
    customerRegister(guardians: RegisterNewCustomerInput, minors: [RegisterNewMinorsInput]): CustomerAuth
    submitSignedWaiver(signedWaiver: String, customerId: ID): SignedWaiver
  }
`;

export default typeDefs;