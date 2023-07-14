const Employee = `#graphql
  type EmployeeAuth{
    token: ID!
    employee: Employee
  }
  
  type Employee {
    id: ID!
    username: String!
    lastName: String!
    firstName: String!
    email: String!
    password: String!
    preferredName: String
    street: String
    city: String
    state: String
    zipCode: String
    phoneNumber: String
  }

  type Role {
    id: ID!
    roleTitle: String!
    description: String
    thumbnail: String
    isActive: Boolean!
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
    street: String
    city: String
    state: String
    zipCode: String
    phoneNumber: String
  }

  extend type Query {
    allEmployees: [Employee]
    getRoles: [Role]
    addEmployeeFormFill: EmployeeForm
  }

  extend type Mutation {
    addUser(input: AddEmployeeFieldsInput): EmployeeAuth
    loginUser(email: String, password: String): EmployeeAuth
  }

`

export default Employee;