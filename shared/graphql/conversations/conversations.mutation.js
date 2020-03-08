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
  mutation addMessage {
    addMessage @client
  }
`;

export default {
  UPDATE_MESSAGE,
  ADD_MESSAGE,
};
