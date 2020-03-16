import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  ResolverInterface,
  Arg,
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
    return this.conversationRepo.findUserConversationOrCreate(
      user.organization.id,
      user.id,
      userId,
    );
  }
}

export default ConversationResolver;
