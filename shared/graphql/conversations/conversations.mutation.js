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

export default {
  UPDATE_MESSAGE,
  ADD_MESSAGE,
  READ_MESSAGE,
};
