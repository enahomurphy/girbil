import { gql } from '@apollo/client';

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

export const USER_SETTINGS = gql`
 query settings {
    settings {
      settings {
        playbackSpeed
        hideInviteWidget
      }
    }
  }
`;

export default {
  USER,
  USER_SETTINGS,
};
