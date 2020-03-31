import { gql } from '@apollo/client';

export const MESSAGE_FRAGMENT = gql`
  fragment MessageParts on Message {
    id
    video
    thumbnail
    replyCount
    hasRead
    state
    conversationId
    parentId
    createdAt
    reactions {
      count
      reaction
      userReacted
    }
    sender {
      id
      name
      avatar
    }
  }
`;

export const CONVERSATION_FRAGMENT = gql`
  fragment ConversationParts on Conversation {
    id
    userId
    receiverType
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    name
    email
    avatar
  }
`;

export const CHANNEL_FRAGMENT = gql`
  fragment ChannelParts on Channel {
    id
    name
    avatar
    isPrivate
    members
  }
`;
