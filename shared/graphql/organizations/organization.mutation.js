import { gql } from 'apollo-boost';
import { ORGANIZATION_FRAGMENT } from './organization.query';

export const ADD_ORGANIZATION = gql`
  mutation addOrganization($domain: String!, $name: String!) {
    addOrganization(domain: $domain, name: $name) {
      organization {
        ...OrganizationParts
      }
      token
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;


export default {
  ADD_ORGANIZATION,
};
