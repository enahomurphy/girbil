import {
  from, ApolloClient, HttpLink, InMemoryCache, gql,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/link-context';

import { data, resolvers } from '.';
import { storage } from '../lib';

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


const errrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.error(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ));
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError.statusCode}`);
    if (networkError.statusCode === 401) {
      storage.clear();
      window.location.href = '/';
    }
  }
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: storage.token ? `Bearer ${storage.token}` : '',
  },
}));

const httpLink = new HttpLink({ uri: 'http://localhost:8081/graphql' });

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

export default client;
