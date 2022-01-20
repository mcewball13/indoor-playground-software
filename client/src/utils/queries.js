import { gql } from "@apollo/client";

export const GET_ROLES_SUCCESS = gql`
    query GetAllRoleNames {
        allRoleNames {
            roleTitle
        }
    }
`