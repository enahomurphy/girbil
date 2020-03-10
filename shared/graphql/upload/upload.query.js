import { gql } from 'apollo-boost';

export const UPLOAD_URLS = gql`
  query uploadURL($id: String!, $conversationId: String!) {
    getUploadURL(id: $id, conversationId: $conversationId) {
      postVideoURL
      postThumbnailURL
      getVideoURL
      getThumbnailURL
    }
  }
`;

export default {
  UPLOAD_URLS,
}