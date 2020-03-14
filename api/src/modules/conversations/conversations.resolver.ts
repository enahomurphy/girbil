import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  ResolverInterface,
  Arg,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { IsString } from 'class-validator';

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
    @Arg('q', { nullable: true }) @IsString() q: string,
      @Ctx() { user: { id, organization } }: ContextType,
  ): Promise<Users[]> {
    return this.conversationRepo.getUsersWithoutConversation(
      organization.id,
      id,
      q,
    );
  }
}

export default ConversationResolver;
