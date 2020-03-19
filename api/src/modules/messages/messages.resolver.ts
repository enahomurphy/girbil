import {
  Resolver,
  Query,
  Authorized,
  ResolverInterface,
  Args,
  Arg,
  Ctx,
  Mutation,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { MessageRepo } from '../../repo';
import { Message } from '../../entity';
import { CanView } from '../../middleware/permissions';
import { MessagesArgs } from './message.args';
import { ValidateArgs } from '../../middleware/decorators';
import { AddMessageInput } from './message.input';
import { ContextType } from '../../interfaces';

@Resolver(Message)
class MessageResolver implements ResolverInterface<Message> {
  private readonly messageRepo = getCustomRepository(MessageRepo);

  @Authorized('user', 'admin', 'owner')
  @ValidateArgs(MessagesArgs)
  @CanView('conversation')
  @Query(() => [Message])
  async messages(
    @Args() { conversationId, messageId }: MessagesArgs,
  ): Promise<Message[]> {
    return this.messageRepo.messages(conversationId, messageId);
  }

  @Authorized('user', 'admin', 'owner')
  @ValidateArgs(MessagesArgs)
  @CanView('conversation')
  @Mutation(() => Message)
  async addMessage(
    @Arg('input') {
      video, thumbnail, id, parentId,
    }: AddMessageInput,
    @Arg('conversationId') @IsUUID() conversationId: string,
    @Ctx() { user }: ContextType,
  ): Promise<Message> {
    const message = plainToClass(Message, {
      id,
      conversationId,
      senderId: user.id,
      video,
      thumbnail,
      parentId: parentId || null,
    });

    const createdMessage = await this.messageRepo.save(message);
    createdMessage.state = 'done';

    return createdMessage;
  }

  @Authorized('user', 'admin', 'owner')
  @ValidateArgs(MessagesArgs)
  @CanView('conversation')
  @Mutation(() => Message)
  async markAsRead(
    @Arg('messageId') @IsUUID() messageId: String,
    @Arg('conversationId') @IsUUID() conversationId: string,
    @Ctx() { user }: ContextType,
  ): Promise<Message> {
    const message = await this.messageRepo.findOne({ id: messageId });
    const { read = [ ]} = message;
    read.push(user.id)
    await this.messageRepo.update(
      {
        id: messageId,
        conversationId,
      },
      {
        read: Array.from(new Set(read))
      }
    )
    return message;
  }
}

export default MessageResolver;
