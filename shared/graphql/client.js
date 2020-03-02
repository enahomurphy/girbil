import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { data, resolvers } from '.';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
  cache,
  resolvers,
});

cache.writeData({ data });

client.onResetStore(() => {
  cache.writeData({ data: {} });
  return Promise.resolve();
});


export default client;
