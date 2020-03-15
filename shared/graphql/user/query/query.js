import { gql } from 'apollo-boost';

export const USER = gql`
 query user($userId: String!) {
    user(userId: $userId) {
      id
      avatar
      name
      organization {
        id
        role
        position
        name
      }
    }
  }
`;

export default {
  USER
};
