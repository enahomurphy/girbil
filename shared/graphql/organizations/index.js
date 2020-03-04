import initialState from './organization.default';
import query from './organization.query';
import mutation from './organization.mutation';

export { query, mutation };

export default {
  default: initialState,
  query,
  mutation
};
