import initialState from './organization.default';
import * as query from './query';
import mutation from './organization.mutation';

export { query, mutation };

export default {
  default: initialState,
  query,
  mutation,
};
