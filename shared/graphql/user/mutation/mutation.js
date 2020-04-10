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

export const UPDATE_USER_SETTINGS = gql`
  mutation updateSettings(
    $hideInviteWidget: Boolean
  ) {
    updateSettings(
      input: {
        hideInviteWidget: $hideInviteWidget
      },
    )
  }
`;

export default {};
