import { gql } from 'apollo-boost';

const ORGANIZATION_FRAGMENT = gql`
  fragment OrganizationParts on organization {
    id
    name
    domain
  }
`;

export const ORGANIZATIONS = gql`
  query organizations {
    organizations @client {
      ...OrganizationParts
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;

export default {
  ORGANIZATIONS,
};
