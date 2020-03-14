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

export default {
  SEARCH_CHANNELS
};
