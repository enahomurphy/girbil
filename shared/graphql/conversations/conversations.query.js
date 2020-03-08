import { gql } from 'apollo-boost';

const MESSAGE_FRAGMENT = gql`
  fragment MessageParts on Message {
    id
    url
    thumbnail
    state
  }
`;

export const MESSAGES = gql`
  query messages {
    messages @client {
      ...MessageParts
      sender {
        name
        createdAt
      }
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export const MESSAGE = gql`
  query message {
    message @client {
      ...MessageParts
      sender {
        name
        createdAt
      }
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export default {
  MESSAGES,
  MESSAGE,
};
