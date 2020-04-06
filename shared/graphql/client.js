import {
  from, ApolloClient, HttpLink, gql,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/link-context';

import { data, resolvers } from '.';
import { storage } from '../lib';
import cache from './cache';

export default ({
  errorHandler = () => {},
}) => {
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'none',
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

  const httpLink = new HttpLink({ uri: `http://localhost:8081/graphql` });

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
      conversations
    }`,
    data: { ...data, messages: [] },
  });

  return client;
};
