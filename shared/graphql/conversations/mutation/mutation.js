import { gql } from '@apollo/client';
import { CONVERSATION_FRAGMENT } from '../query';

export const UPDATE_MESSAGE = gql`
  mutation updateMessage($id: String!, $thumbnail: String, $url: String) {
    updateMessage(
      input: {
        thumbnail: $thumbnail
        url: $url
      }
      id: $id
    ) @client
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($conversationId: String!, $messageId: String) {
    addMessage(conversationId: $conversationId, messageId: $messageId) @client
  }
`;

export const READ_MESSAGE = gql`
  mutation readMessage($id: String!, $conversationId: String!) {
    readMessage(id: $id, conversationId: $conversationId) @client
  }
`;

export const SAVE_MESSAGE = gql`
  mutation saveMessage(
    $conversationId: String!
    $id: String!
    $video: String!
    $thumbnail: String!
    $parentId: String
  ) {
    addMessage(
      input: {
        id: $id,
        video: $video,
        thumbnail: $thumbnail
        parentId: $parentId
      }
      conversationId: $conversationId
    ) {
      id
      video
      conversationId
      thumbnail
      state
    }
  }
`;

export const UPDATE_MESSAGE_STATE = gql`
  mutation updateState(
    $conversationId: String!
    $messageId: String!
    $threadId: String
    $state: String!
  ) {
    updateState(
      conversationId: $conversationId,
      messageId: $messageId,
      threadId: $threadId,
      state: $state
    ) @client
  }
`;

export const MARK_MESSAGE_AS_READ = gql`
  mutation markAsRead($messageId: String!, $conversationId: String!)  {
    markAsRead(
      messageId: $messageId,
      conversationId: $conversationId
    ) {
      id
      parentId
      conversationId
    }
  }
`;

export const MARK_MESSAGE_AS_UNREAD = gql`
  mutation markAsUnRead ($messageId: String!, $conversationId: String!)  {
    markAsUnRead(
      messageId: $messageId,
      conversationId: $conversationId
    ) {
      id
      parentId
      conversationId
    }
  }
`;

export const CLOSE_CONVERSATION = gql`
  mutation closeConversation($conversationId: String!)  {
    closeConversation(
      conversationId: $conversationId
    )
  }
`;

export const DELETE_MESSAGE = gql`
  mutation deleteMessage($messageId: String!)  {
    deleteMessage(
      messageId: $messageId
    )
  }
`;

export const REACT_TO_MESSAGE = gql`
  mutation reactToMessage($messageId: String!, $reaction: String!)  {
    reactToMessage(
      messageId: $messageId
      reaction: $reaction
    )
  }
`;

export const GET_USER_CONVERSATION_OR_CREATE = gql`
  mutation getUserConversationOrCreate($userId: String!) {
    getUserConversationOrCreate(userId: $userId) {
      ...ConversationParts
    }
  }
  ${CONVERSATION_FRAGMENT}
`;


export default {
  UPDATE_MESSAGE,
  ADD_MESSAGE,
  READ_MESSAGE,
  SAVE_MESSAGE,
  MARK_MESSAGE_AS_READ,
  CLOSE_CONVERSATION,
  REACT_TO_MESSAGE,
  GET_USER_CONVERSATION_OR_CREATE,
};
