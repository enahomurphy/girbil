import { gql } from '@apollo/client';
import { ORGANIZATION_FRAGMENT } from '../query';

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

export const UPDATE_ORGANIZATION = gql`
  mutation updateOrganization($name: String, $domain: String) {
    updateOrganization(domain: $domain, name: $name) {
      id
      name
      domain
    }
  }
`;

export default {
  ADD_ORGANIZATION,
  UPDATE_ORGANIZATION,
};
