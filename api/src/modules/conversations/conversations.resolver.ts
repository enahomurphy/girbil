import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  ResolverInterface,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { ConversationRepo } from '../../repo';
import { Conversation, UserConversations } from '../../entity';
import { ContextType } from '../../interfaces';

@Resolver(Conversation)
class ConversationResolver implements ResolverInterface<Conversation> {
  private readonly conversationRepo = getCustomRepository(ConversationRepo);

  @Authorized()
  @Query(() => [Conversation])
  async conversations(@Ctx() { user }: ContextType): Promise<UserConversations[]> {
    return this.conversationRepo.conversations(
      user.id,
      user.organization.id,
    );
  }
}

export default ConversationResolver;
