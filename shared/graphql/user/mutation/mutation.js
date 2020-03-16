import { gql } from '@apollo/client';

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

export default {};
