import { gql } from 'apollo-boost';

const MESSAGE_FRAGMENT = gql`
  fragment MessageParts on message {
    id
    url
    thumbnail
    state
    sender {
      name
      createdAt
    }
  }
`;

export const MESSAGES = gql`
  query messages {
    messages @client {
      ...MessageParts
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export const MESSAGE = gql`
  query message {
    message @client {
      ...MessageParts
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export default {
  MESSAGES,
  MESSAGE,
};
