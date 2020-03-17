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

export default {
  ORGANIZATIONS,
  GET_ORGANIZATION_BY_DOMAIN,
  GET_ORGANIZATION,
};
