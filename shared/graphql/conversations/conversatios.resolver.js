import { mutationResolver } from './mutation';
import { queryResolver } from './query';

export default {
  Query: queryResolver,
  Mutation: mutationResolver
};
