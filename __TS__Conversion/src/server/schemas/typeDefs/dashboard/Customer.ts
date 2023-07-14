const DashboardCustomer = `#graphql

extend type Query {
    emailExists(email: String!): Boolean
}
`

export default DashboardCustomer;