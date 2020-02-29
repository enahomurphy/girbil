import merge from 'lodash.merge';

import conversations from './conversations'; // basic example. will be removed later

export const resolvers = merge(
  conversations.resolver,
);

export const data = {
  ...conversations.default,
};

export default {
  resolvers,
  data,
};
