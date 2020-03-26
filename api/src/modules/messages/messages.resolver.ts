import {
  Resolver,
  Query,
  Authorized,
  Args,
  Arg,
  Ctx,
  Mutation,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { MessageRepo } from '../../repo';
import { Message } from '../../entity';
import { CanView, CanEdit } from '../../middleware/permissions';
import { MessagesArgs, MessageIDArgs, MessageReactionArgs } from './message.args';
import { ValidateArgs } from '../../middleware/decorators';
import { AddMessageInput } from './message.input';
import { ContextType } from '../../interfaces';
import { ConversationIDArgs } from '../conversations/conversation.args';
import * as socket from '../../services/socket';

@Resolver(Message)
class MessageResolver {
  private readonly messageRepo = getCustomRepository(MessageRepo);

  @Authorized('user', 'admin', 'owner')
  @ValidateArgs(MessagesArgs)
  @CanView('conversation')
  @Query(() => [Message])
  async messages(
    @Args() { conversationId, messageId }: MessagesArgs,
      @Ctx() { user }: ContextType,
  ): Promise<Message[]> {
    return this.messageRepo.messages(conversationId, user.id, messageId);
  }

  @Authorized('user', 'admin', 'owner')
  @CanView('conversation')
  @Mutation(() => Message)
  async addMessage(
    @Arg('input') {
      video, thumbnail, id, parentId,
    }: AddMessageInput,
    @Args() { conversationId }: ConversationIDArgs,
    @Ctx() { user: { id: userId, organization, user } }: ContextType,
  ): Promise<Message> {
    const message = plainToClass(Message, {
      id,
      conversationId,
      senderId: userId,
      video,
      thumbnail,
      parentId: parentId || null,
      read: [userId],
    });

    const createdMessage = await this.messageRepo.save(message);
    createdMessage.state = 'done';
    createdMessage.sender = user;

    socket.broadcast(organization.id, socket.events.MESSAGE_CREATED, message);
    return createdMessage;
  }

  @Authorized('user', 'admin', 'owner')
  @CanView('conversation')
  @Mutation(() => Message, { nullable: true })
  async markAsRead(
    @Args() { messageId }: MessageIDArgs,
      @Args() { conversationId }: ConversationIDArgs,
      @Ctx() { user }: ContextType,
  ): Promise<Message> {
    const message = await this.messageRepo.findOne({ id: messageId });

    if (!message) {
      throw new Error('Message does not exist');
    }

    let { read } = message;
    if (!read) {
      read = [];
    }

    read.push(user.id);
    await this.messageRepo.update(
      {
        id: messageId,
        conversationId,
      },
      {
        read: Array.from(new Set(read)),
      },
    );
    return message;
  }

  @Authorized('user', 'admin', 'owner')
  @ValidateArgs(MessagesArgs)
  @CanView('conversation')
  @Mutation(() => Message, { nullable: true })
  async markAsUnRead(
    @Args() { conversationId, messageId }: MessagesArgs,
      @Ctx() { user }: ContextType,
  ): Promise<Message> {
    const message = await this.messageRepo.findOne({ id: messageId });

    if (!message) {
      throw new Error('Message does not exist');
    }

    let { read } = message;

    if (!read) {
      read = [];
    }

    if (!message.read.length) {
      return message;
    }

    read = read.filter((id) => id !== user.id);
    await this.messageRepo.update(
      {
        id: messageId,
        conversationId,
      },
      {
        read: Array.from(new Set(read)),
      },
    );

    return message;
  }

  @Authorized('user', 'admin', 'owner')
  @CanEdit('message')
  @Mutation(() => String)
  async deleteMessage(
    @Args() { messageId }: MessageIDArgs,
      @Ctx() { user: { organization, user } }: ContextType,
  ): Promise<string> {
    const message = await this.messageRepo.findOne({ id: messageId });
    if (message) {
      this.messageRepo.delete({ id: message.id });
    }

    message.sender = user;
    socket.broadcast(organization.id, socket.events.MESSAGE_DELETED, { message });
    return 'Message deleted';
  }


  @Authorized('user', 'admin', 'owner')
  @Mutation(() => String)
  async reactToMessage(
    @Args() { messageId, reaction }: MessageReactionArgs,
      @Ctx() { user }: ContextType,
  ): Promise<string> {
    await this.messageRepo.updateReaction(messageId, user.id, reaction);

    return `Reacted with ${reaction}`;
  }
}

export default MessageResolver;
