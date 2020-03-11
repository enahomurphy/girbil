import { gql } from 'apollo-boost';

export const MESSAGE_FRAGMENT = gql`
  fragment MessageParts on Message {
    id
    video
    thumbnail
    state
    conversationId
    parentId
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
  query userMessages($conversationId: String!, $messageId: String) {
    messages(conversationId: $conversationId, messageId: $messageId)  {
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

export const GET_MESSAGES = gql`
  query getMessages($conversationId: String!, $messageId: String) {
    messages(conversationId: $conversationId, messageId: $messageId) @client {
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

export const GET_MESSAGE = gql`
  query getMessage($conversationId: String!, $messageId: String) {
    messages(conversationId: $conversationId, messageId: $messageId) @client {
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
  GET_MESSAGE,
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES
};
