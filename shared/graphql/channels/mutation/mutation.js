import { gql } from 'apollo-boost';

export const CREATE_CHANNEL = gql`
  mutation createChannel(
    $isPrivate: String
    $name: String
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
    )
  }
`;
