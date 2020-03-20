import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  ResolverInterface,
  Arg,
  Mutation,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { ConversationRepo } from '../../repo';
import {
  Conversation, UserConversations, User, ConversationType,
} from '../../entity';
import { ContextType } from '../../interfaces';
import { CanView } from '../../middleware/permissions';

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
  @Query(() => Conversation, { nullable: true })
  async conversation(
    @Arg('conversationId') @IsUUID() conversationId: string,
      @Ctx() { user: { id, organization } }: ContextType,
  ): Promise<UserConversations> {
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
    @Arg('q', { nullable: true }) @IsString() q: string,
      @Ctx() { user: { id, organization } }: ContextType,
  ): Promise<Users[]> {
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
    @Arg('userId') @IsUUID() userId: string,
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
    @Arg('conversationId') @IsUUID() conversationId: string,
  ): Promise<string> {
    await this.conversationRepo.update({ id: conversationId }, { open: false });
    return 'conversation closed';
  }
}

export default ConversationResolver;
