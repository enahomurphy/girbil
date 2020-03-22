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
import { plainToClass } from 'class-transformer';

import { ConversationRepo } from '../../repo';
import {
  Conversation, User, ConversationType,
} from '../../entity';
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
    const conversation = await this.conversationRepo.findOne({
      where: {
        id: conversationId,
        organizationId: organization.id,
      },
      relations: ['receiver', 'channel', 'creator'],
    });

    if (conversation.receiverType !== ConversationType.CHANNEL) {
      if (conversation.receiver.id === id) {
        return plainToClass(Conversation, {
          ...conversation,
          receiver: conversation.creator,
        });
      }
    }

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
  @Query(() => Conversation)
  async getUserConversationOrCreate(
    @Args() { userId }: UserIDArgs,
      @Ctx() { user }: ContextType,
  ): Promise<Conversation> {
    const conversation = await this.conversationRepo.findUserConversationOrCreate(
      user.organization.id,
      user.id,
      userId,
    );

    if (!conversation.open) {
      conversation.open = true;
      this.conversationRepo.manager.save(conversation);
    }

    return conversation;
  }

  @Authorized('user', 'admin', 'owner')
  @CanView('conversation')
  @Mutation(() => String, { nullable: true })
  async closeConversation(
    @Args() { conversationId }: ConversationIDArgs,
  ): Promise<string> {
    await this.conversationRepo.update({ id: conversationId }, { open: false });
    return 'conversation closed';
  }
}

export default ConversationResolver;
