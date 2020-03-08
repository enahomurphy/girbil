import { gql } from 'apollo-boost';

export const UPLOAD_URLS = gql`
  query uploadURL($id: String!) {
    getUploadURL(id: $id) {
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