import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import { data, resolvers } from '.';
import { storage } from '../lib'

const cache = new InMemoryCache();

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

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
  cache,
  resolvers,
  
  headers: {
    authorization: storage.token ? `Bearer ${storage.token}` : ''
  },
  defaultOptions
});

cache.writeQuery({
  query: gql`{ messages }`,
  data,
})

export default client;
