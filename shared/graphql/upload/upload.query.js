import { gql } from '@apollo/client';

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

export const USER_UPLOAD_URL = gql`
  query getUserUploadURL {
    getUserUploadURL{
      postURL
      getURL
    }
  }
`;

export const CHANNEL_UPLOAD_URL = gql`
  query getChannelUploadURL($channelId: String!) {
    getChannelUploadURL(channelId: $channelId) {
      postURL
      getURL
    }
  }
`;

export default {
  UPLOAD_URLS,
  USER_UPLOAD_URL,
  CHANNEL_UPLOAD_URL,
};
