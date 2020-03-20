import { gql } from '@apollo/client';

export const CREATE_CHANNEL = gql`
  mutation createChannel(
    $isPrivate: Boolean
    $name: String!
    $about: String
    $avatar: String
  ) {
    createChannel(
      input: {
        isPrivate: $isPrivate,
        name: $name,
        about: $about,
        avatar: $avatar
      }
    ) {
      id
      avatar
      name 
      conversation {
        id
      }
    }
  }
`;

export const UPDATE_CHANNEL = gql`
  mutation updateChannel(
    $isPrivate: Boolean
    $name: String!
    $about: String
    $avatar: String
    $channelId: String!
  ) {
    updateChannel(
      input: {
        isPrivate: $isPrivate,
        name: $name,
        about: $about,
        avatar: $avatar
      },
      channelId: $channelId
    )
  }
`;

export const ADD_USERS_TO_CHANNEL = gql`
  mutation addUsersToChannel($channelId: String!, $userIds: [String!]!) {
    addUsersToChannel(
      input:{
        userIds: $userIds
      },
      channelId: $channelId
    )
  }
`;

export const LEAVE_CHANNEL = gql`
  mutation leaveChannel($channelId: String!) {
    leaveChannel(
      channelId: $channelId
    )
  }
`;
