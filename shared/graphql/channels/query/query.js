import { gql } from '@apollo/client';

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
`;

export const CHANNEL = gql`
 query channel($channelId: String!) {
    channel(channelId: $channelId) {
      id
      avatar
      name
      about,
      isPrivate
      userId
      conversation {
        id
      }
    }
  }
`;

export const CHANNEL_BY_NAME = gql`
 query channelByName($name: String!) {
    channelByName(name: $name) {
      id
    }
  }
`;

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
`;

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
`;

export const CHANNELS_NOT_A_MEMBER = gql`
  query searchChannelsNotIn($text: String) {
    searchChannelsNotIn(text: $text) {
      id
      avatar,
      members
      name
      userId
      conversation {
        id
      }
    }
  }
`;

export default {
  SEARCH_CHANNELS,
  GET_CHANNEL_MEMBERS,
  GET_USERS_NOT_IN_CHANNEL,
  CHANNEL_BY_NAME,
};
