import initialState from './conversations.default';
import resolver from './conversatios.resolver';
import * as query from './query';
import mutation from './conversations.mutation';
import types from './conversations.types.gql';


export { query };
export { mutation };

export default {
  default: initialState,
  resolver,
  query,
  mutation,
  types
};
