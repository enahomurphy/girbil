import initialState from './organization.default';
import * as query from './query';
import * as mutation from './mutation';

export { query, mutation };

export default {
  default: initialState,
  query,
  mutation,
};
