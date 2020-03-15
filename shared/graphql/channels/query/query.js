import { gql } from 'apollo-boost';

export const SEARCH_CHANNELS = gql`
 query channels($text: String) {
    channels(text: $text) {
      id
      members
      avatar
      name
      conversation {
        id
      }
    }
  }
`

export const CHANNEL = gql`
 query channels($channelId: String!) {
    channel(channelId: $channelId) {
      id
      avatar
      name
      about,
      isPrivate
      conversation {
        id
      }
    }
  }
`

export default {
  SEARCH_CHANNELS
};
