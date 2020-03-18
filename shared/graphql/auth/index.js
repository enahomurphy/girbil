import initialState from './auth.default';
import mutation from './auth.mutation';
import * as query from './query';

export { mutation, query };

export default {
  default: initialState,
  mutation,
};
