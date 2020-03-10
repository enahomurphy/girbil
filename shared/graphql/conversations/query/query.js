import { gql } from 'apollo-boost';

export const MESSAGE_FRAGMENT = gql`
  fragment MessageParts on Message {
    id
    video
    thumbnail
    state
  }
`;

export const MESSAGES = gql`
  query messages @client {
    messages {
      ...MessageParts
      sender {
        id
        name
        avatar
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
        id
        name
        avatar
      }
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export const USER_CONVERSATIONS = gql`
  query conversations {
    conversations {
      id
      userId
      receiverType
      channel {
        id
        name
        avatar
        isPrivate
      }
      receiver {
        id
        name
        email
        avatar
      }
    }
  }
`;

export const CONVERSATION_MESSAGES = gql`
  query userMessages($conversationId: String!) {
    messages(conversationId: $conversationId) {
      ...MessageParts
      sender {
        id
        name
        avatar
      }
    }
  }
  ${MESSAGE_FRAGMENT}
`;


export default {
  MESSAGES,
  MESSAGE,
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES
};
