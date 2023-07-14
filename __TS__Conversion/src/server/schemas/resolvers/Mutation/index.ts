import { CustomerAuthMutations } from "./auth";
import { UserMutations } from "./user";
// utils
import { merge } from "lodash";

const resolvers = merge(CustomerAuthMutations, UserMutations);

export default resolvers;