import initialState from './conversations.default';
import resolver from './conversatios.resolver';
import query from './conversations.query';
import mutation from './conversations.mutation';


export { query };
export { mutation };

export default {
  default: initialState,
  resolver,
  query,
  mutation,
};
