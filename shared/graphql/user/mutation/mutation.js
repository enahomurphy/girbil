import { gql } from 'apollo-boost';

export const UPDATE_USER = gql`
  mutation updateUser(
    $name: String
    $position: String
    $userId: String!
  ) {
    updateUser(
      input: {
        name: $name,
        position: $position
      },
      userId: $userId
    )
  }
`;
