import merge from 'lodash.merge';

import conversations from './conversations';
import organizations from './organizations';
import auth from './auth';

export const resolvers = merge(
  conversations.resolver,
);

export const data = [
  conversations,
  auth,
  organizations
].reduce((acc, { default: initial }) => {
  return { ...acc, ...initial }
}, {});

export {
  conversations,
  auth,
  organizations
};

export default {
  resolvers,
  data,
};
