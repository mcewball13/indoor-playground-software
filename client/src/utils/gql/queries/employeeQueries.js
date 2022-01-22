import { gql } from '@apollo/client';

export const GET_ROLE_NAMES = gql`
  query GetRoleNames {
    getRoles {
      roleTitle
    }
  }
`;
