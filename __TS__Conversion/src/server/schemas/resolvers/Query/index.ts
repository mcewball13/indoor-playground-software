import { User } from './user';
import { CustomerDashboard } from './dashboard';
// utils
import { merge } from 'lodash'

const resolvers = merge(User, CustomerDashboard);

export default resolvers;