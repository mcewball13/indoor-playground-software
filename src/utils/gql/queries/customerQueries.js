export const GET_ALL_CUSTOMERS = `
query GetAllCustomers {
  allCustomers {
  id
  guardianFirstName
  guardianLastName
  displayName
  minors {
    id
    minorFirstName
    minorLastName
    minorBirthday
    email
  }
}
}
`;

export const EMAIL_EXISTS = `
query emailExistsBoolean($email: String!) {
  emailExists(email: $email)
}
`
