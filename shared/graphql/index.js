import merge from 'lodash.merge';

import conversations from './conversations';

export const resolvers = merge(
  conversations.resolver,
);

export const data = {
  ...conversations.default,
};

export {
  conversations,
}

export default {
  resolvers,
  data,
};
