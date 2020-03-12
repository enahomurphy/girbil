import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import { data, resolvers } from '.';
import { storage } from '../lib'

const cache = new InMemoryCache({
  typePolicies: {
    Message: {
      keyFields: ['id'],
    }
  }
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

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
  cache,
  resolvers,
  
  headers: {
    authorization: storage.token ? `Bearer ${storage.token}` : ''
  },
  defaultOptions
});

client.writeQuery({
  query: gql`{
    messages
    conversationMeta
  }`,
  data,
})

export default client;
