import { useApolloClient, gql } from '@apollo/client';

export const useUpdateUserPresence = () => {
  const { cache } = useApolloClient();

  return ({ id, isActive = true, lastActive = new Date().getTime() }) => {
    const fragment = gql`
    fragment userOnlinefragment on User {
      lastActive
      isActive
    }
  `;
    cache.writeFragment({
      id: cache.identify({ __typename: 'User', id }),
      fragment,
      data: { lastActive, isActive },
    });
  };
};

export default { useUpdateUserPresence };
