import { gql } from '@apollo/client';

export const SOCIAL_LOGIN = gql`
  mutation social(
    $accessToken: String!,
    $type: String!,
    $inviteId: String,
    $emailToken: String
  ) {
    social(input: {
      accessToken: $accessToken
      type: $type
      inviteId: $inviteId
      emailToken: $emailToken
    }) {
      token
      user {
        id
        isVerified
        avatar
        email
      }
      organizations {
        id
        name
        domain
      }
    }
  }
`;

export const INVITE = gql`
  mutation invite($emails: [String!]!) {
    invite(input: {
      emails: $emails
    })
  }
`;

export default {
  SOCIAL_LOGIN,
  INVITE,
};
