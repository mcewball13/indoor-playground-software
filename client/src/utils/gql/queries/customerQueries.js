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
