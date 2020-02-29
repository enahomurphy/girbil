import { gql } from 'apollo-boost';

export const MESSAGES = gql`
  query messages {
    messages @client {
      id
      url
      thumbnail
      state
    }
  }
`;

export const MESSAGE = gql`
  query message {
    message @client {
      id
      url
      thumbnail
      state
    }
  }
`;

export default {
  MESSAGES,
  MESSAGE,
};
