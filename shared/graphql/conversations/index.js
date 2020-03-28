import initialState from './conversations.default';
import resolver from './conversatios.resolver';
import * as query from './query';
import * as mutation from './mutation';


export { query };
export { mutation };

export default {
  default: initialState,
  resolver,
  query,
  mutation,
};
