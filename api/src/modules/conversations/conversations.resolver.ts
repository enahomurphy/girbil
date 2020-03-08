import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  ResolverInterface,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { ConversationRepo } from '../../repo';
import { Conversation } from '../../entity';

@Resolver(Conversation)
class ConversationResolver implements ResolverInterface<Conversation> {
  private readonly conversationRepo = getCustomRepository(ConversationRepo);

  @Authorized()
  @Query(() => [Conversation])
  async conversations(@Ctx() { user }: ContextType): Promise<Conversation[]> {
    return this.conversationRepo.find({
      creatorId: user.id,
    });
  }
}

export default ConversationResolver;
