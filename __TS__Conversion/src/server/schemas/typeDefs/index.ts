import RootTypeDefs from './root';
import Global from './Global';
import Customer from './Customer'
import DashboardCustomer from './dashboard/Customer';
import Employee from './Employee';

const typeDefs = `#graphql
${Global}
${RootTypeDefs}
${Customer}
${DashboardCustomer}
${Employee}
`;

export default typeDefs;
