import { gql } from 'apollo-boost';

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
  mutation addMessage($conversationId: String!) {
    addMessage(conversationId: $conversationId) @client
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
  ) {
    addMessage(
      input: {
        id: $id,
        video: $video,
        thumbnail: $thumbnail
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

export default {
  UPDATE_MESSAGE,
  ADD_MESSAGE,
  READ_MESSAGE,
  SAVE_MESSAGE,
};
