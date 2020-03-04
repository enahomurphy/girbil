import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { data, resolvers } from '.';
import { storage } from '../lib'

const cache = new InMemoryCache();

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
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

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
  cache,
  resolvers,
  defaultOptions,
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: storage.token ? `Bearer ${storage.token}` : ''
      }
    })
  }
});
client.defaultOptions = defaultOptions;

cache.writeData({ data });

client.onResetStore(() => {
  cache.writeData({ data: {} });
  return Promise.resolve();
});

export default client;
