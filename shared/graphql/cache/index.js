import { InMemoryCache } from '@apollo/client';

import { mergeArrayByField } from './cache';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        messages: {
          merge: mergeArrayByField,
        },
      },
    },
    Message: {
      keyFields: ['id'],
    },
    Conversation: {
      keyFields: ['id'],
    },
  },
});

export default cache;
