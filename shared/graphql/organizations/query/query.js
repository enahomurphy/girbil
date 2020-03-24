import { gql } from '@apollo/client';

export const ORGANIZATION_FRAGMENT = gql`
  fragment OrganizationParts on Organization {
    id
    name
    domain
  }
`;

export const ORGANIZATIONS = gql`
  query organizations {
    organizations {
      ...OrganizationParts
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;


export const GET_ORGANIZATION_BY_DOMAIN = gql`
  query organizationByDomain($domain: String!) {
    organizationByDomain(domain: $domain) {
      ...OrganizationParts
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;

export const GET_ORGANIZATION = gql`
  query organization($organizationId: String!) {
    organization(organizationId: $organizationId) {
      ...OrganizationParts
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;

export const GET_ORGANIZATION_USERS = gql`
  query organizationUsers  {
    organizationUsers {
      position
      role
      organizationId,
      user {
        id
        avatar
        name
        email
      }
    }
  }
`;

export const ORGANIZATION_LOGIN = gql`
  query organizationLogin($organizationId: String!) {
    organizationLogin(
      organizationId: $organizationId
    ) {
      token
      user {
        id
        name
      }
    }
  }
`;

export const SEARCH_ORGANIZATION = gql`
 query searchOrganization($text: String!) {
    searchOrganization(text: $text) {
      id
      avatar
      name
      type
      conversationid
      members
    }
  }
`;

export default {
  ORGANIZATIONS,
  GET_ORGANIZATION_BY_DOMAIN,
  GET_ORGANIZATION,
  GET_ORGANIZATION_USERS,
  SEARCH_ORGANIZATION
};
