import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { data, resolvers } from '.';
import { storage } from '../lib'

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
  cache,
  resolvers,
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: storage.token ? `Bearer ${storage.token}` : ''
      }
    })
  }
});

cache.writeData({ data });

client.onResetStore(() => {
  cache.writeData({ data: {} });
  return Promise.resolve();
});

export default client;
