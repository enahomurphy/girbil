import { gql } from '@apollo/client';

export const INVITE_URL = gql`
  query inviteUrl {
    inviteUrl
  }
`;

export const INVITE_URL_ORGANIZATION = gql`
query inviteUrlOrganization(
    $inviteId: String
    $emailToken: String
  )  {
  inviteUrlOrganization(
    inviteId: $inviteId
    emailToken: $emailToken
  ) {
    id
    domain
    name
  }
}
`;

export default {
  INVITE_URL,
  INVITE_URL_ORGANIZATION,
};
