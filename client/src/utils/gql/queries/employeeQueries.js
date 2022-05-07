import { gql } from '@apollo/client';

export const GET_ROLE_NAMES = `
  query GetRoleNames {
    getRoles {
      roleTitle
    }
  }
`;
