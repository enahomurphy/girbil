import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  Arg,
  Mutation,
  Args,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { ConversationRepo } from '../../repo';
import { Conversation, User } from '../../entity';
import { ContextType } from '../../interfaces';
import { CanView } from '../../middleware/permissions';
import { ConversationIDArgs } from './conversation.args';
import { UserIDArgs } from '../user/user.args';

@Resolver(Conversation)
class ConversationResolver {
  private readonly conversationRepo = getCustomRepository(ConversationRepo);

  @Authorized('user', 'admin', 'owner')
  @Query(() => [Conversation])
  async conversations(@Ctx() { user }: ContextType): Promise<Conversation[]> {
    return this.conversationRepo.conversations(
      user.id,
      user.organization.id,
    );
  }

  @Authorized('user', 'admin', 'owner')
  @Query(() => Conversation, { nullable: true })
  async conversation(
    @Args() { conversationId }: ConversationIDArgs,
      @Ctx() { user: { id, organization } }: ContextType,
  ): Promise<Conversation> {
    const [conversation] = await this.conversationRepo.conversations(
      id,
      organization.id,
      conversationId,
    );

    return conversation;
  }

  @Authorized('user', 'admin', 'owner')
  @Query(() => [User])
  async usersWithoutConversation(
    @Arg('q', { nullable: true }) q: string,
      @Ctx() { user: { id, organization } }: ContextType,
  ): Promise<User[]> {
    return this.conversationRepo.getUsersWithoutConversation(
      organization.id,
      id,
      q,
    );
  }

  @Authorized('user', 'admin', 'owner')
  @CanView('user')
  @Mutation(() => Conversation)
  async getUserConversationOrCreate(
    @Args() { userId }: UserIDArgs,
      @Ctx() { user }: ContextType,
  ): Promise<Conversation> {
    const conversation = await this.conversationRepo.findUserConversationOrCreate(
      user.organization.id,
      user.id,
      userId,
    );

    if (conversation.closed.length) {
      this.conversationRepo.update({ id: conversation.id }, { closed: [] });
    }

    conversation.receiver = user.user;

    return conversation;
  }

  @Authorized('user', 'admin', 'owner')
  @CanView('conversation')
  @Mutation(() => String, { nullable: true })
  async closeConversation(
    @Args() { conversationId }: ConversationIDArgs,
      @Ctx() { user: { id: userId } }: ContextType,
  ): Promise<string> {
    const { closed } = await this.conversationRepo.findOne({ id: conversationId });
    closed.push(userId);

    await this.conversationRepo.update(
      { id: conversationId },
      { closed: Array.from(new Set(closed)) },
    );

    return 'conversation closed';
  }
}

export default ConversationResolver;
