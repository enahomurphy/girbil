import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation updateUser(
    $name: String
    $position: String
    $avatar: String
    $userId: String!
  ) {
    updateUser(
      input: {
        name: $name,
        position: $position,
        avatar: $avatar
      },
      userId: $userId
    )
  }
`;

export default {};
