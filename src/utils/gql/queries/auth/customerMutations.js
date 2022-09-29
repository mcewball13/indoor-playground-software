export const ADD_NEW_CUSTOMER = `
mutation AddNewCustomer($guardians: RegisterNewCustomerInput, $minors: [RegisterNewMinorsInput]) {
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

export const SUBMIT_SIGNED_WAIVER = `
mutation AddWaiverCloudinary($signedWaiver: String, $customerId: ID) {
  submitSignedWaiver(signedWaiver: $signedWaiver, customerId: $customerId) {
    signedWaiverURL
  }
}
`
