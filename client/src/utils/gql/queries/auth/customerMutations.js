export const ADD_NEW_CUSTOMER = `
mutation addNewCustomer($guardians: RegisterNewCustomerInput, $minors: [RegisterNewMinorsInput]) {
    customerRegister(guardians: $guardians, minors: $minors) {
      customerAccessToken
      customer {
        id
        guardianFirstName
        guardianLastName
        displayName
        minors {
          minorFirstName
          minorLastName
          minorBirthday
        }
      }
    }
  }
`
