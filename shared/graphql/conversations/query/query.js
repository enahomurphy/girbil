import { gql } from 'apollo-boost';
import { MESSAGE_FRAGMENT, CHANNEL_FRAGMENT, USER_FRAGMENT, CONVERSATION_FRAGMENT } from './fragments'

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
      ...ConversationParts
      channel {
        ...ChannelParts
      }
      receiver {
        ...UserParts
      }
    }
  }
  ${CONVERSATION_FRAGMENT}
  ${CHANNEL_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const CONVERSATION = gql`
  query conversation($conversationId: String!) {
    conversation(conversationId: $conversationId) @client {
      ...ConversationParts
      channel {
        ...ChannelParts
      }
      receiver {
        ...UserParts
      }
    }
  }
  ${CONVERSATION_FRAGMENT}
  ${CHANNEL_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const CONVERSATION_META = gql`
  query conversationMeta($conversationId: String!) {
    conversationMeta(conversationId: $conversationId) @client {
      id
      name
      typeId
      isPrivate
      avatar
      isChannel
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
  query message($conversationId: String!, $messageId: String!, $threadId: String) {
    message(
      conversationId: $conversationId,
      messageId: $messageId,
      threadId: $threadId,
    ) @client {
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


export const GET_USERS_WITHOUT_CONVERSATION = gql`
  query usersWithoutConversation($query: String) {
    usersWithoutConversation(q: $query) {
      id
      name
      avatar
    }
  }
`;

export default {
  MESSAGES,
  GET_MESSAGE,
  USER_CONVERSATIONS,
  CONVERSATION_MESSAGES,
  GET_USERS_WITHOUT_CONVERSATION
};
