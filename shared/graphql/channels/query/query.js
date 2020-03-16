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
 query channel($channelId: String!) {
    channel(channelId: $channelId) {
      id
      avatar
      name
      about,
      isPrivate
      ownerId
      conversation {
        id
      }
    }
  }
`

export const GET_CHANNEL_MEMBERS = gql`
 query channelMembers($channelId: String!) {
    channel(channelId: $channelId) {
      id
      avatar
      name
      about,
      isPrivate
    }
    channelMembers(channelId: $channelId) {
      members {
        id
        avatar
        name
      }
      count
    }
  }
`

export const GET_USERS_NOT_IN_CHANNEL = gql`
 query usersNotInChannel($channelId: String!) {
    usersNotInChannel(channelId: $channelId) {
      members {
        id
        avatar
        name
      }
      count
    }
  }
`

export default {
  SEARCH_CHANNELS,
  GET_CHANNEL_MEMBERS,
  GET_USERS_NOT_IN_CHANNEL
};
