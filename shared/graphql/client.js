import {
  from, ApolloClient, HttpLink, InMemoryCache, gql,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/link-context';

import { data, resolvers } from '.';
import { storage } from '../lib';

export default ({
  errorHandler = () => {},
}) => {
  const cache = new InMemoryCache({
    typePolicies: {
      Message: {
        keyFields: ['id'],
      },
    },
  });

  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  };

  const errrorLink = onError(({ graphQLErrors, networkError, ...props }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ));
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError.statusCode}`);
    }
    errorHandler({ graphQLErrors, networkError, ...props });
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: storage.token ? `Bearer ${storage.token}` : '',
      timezone: window.Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone : '',
    },
  }));

  const httpLink = new HttpLink({ uri: `${process.env.API_URL}/graphql` });

  const link = from([
    errrorLink,
    authLink.concat(httpLink),
  ]);

  const client = new ApolloClient({
    link,
    cache,
    resolvers,
    defaultOptions,
  });

  client.writeQuery({
    query: gql`{
      messages
      conversationMeta
    }`,
    data,
  });

  return client;
};
