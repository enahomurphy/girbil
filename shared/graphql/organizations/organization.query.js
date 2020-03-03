import { gql } from 'apollo-boost';

const ORGANIZATION_FRAGMENT = gql`
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

export default {
  ORGANIZATIONS,
};
