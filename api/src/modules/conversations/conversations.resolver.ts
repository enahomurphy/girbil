import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  ResolverInterface,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { ConversationRepo } from '../../repo';
import { Conversation, UserConversations, User } from '../../entity';
import { ContextType } from '../../interfaces';

@Resolver(Conversation)
class ConversationResolver implements ResolverInterface<Conversation> {
  private readonly conversationRepo = getCustomRepository(ConversationRepo);

  @Authorized('user', 'admin', 'owner')
  @Query(() => [Conversation])
  async conversations(@Ctx() { user }: ContextType): Promise<UserConversations[]> {
    return this.conversationRepo.conversations(
      user.id,
      user.organization.id,
    );
  }

  @Authorized('user', 'admin', 'owner')
  @Query(() => [User])
  async usersWithoutConversation(
    @Ctx() { user: { id, organization } }: ContextType,
  ): Promise<Users[]> {
    return this.conversationRepo.getUsersWithoutConversation(
      organization.id,
      id,
    );
  }
}

export default ConversationResolver;
