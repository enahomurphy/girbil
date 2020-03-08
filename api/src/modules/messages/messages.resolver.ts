import {
  Resolver,
  Query,
  Authorized,
  ResolverInterface,
  Args,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { MessageRepo } from '../../repo';
import { Message } from '../../entity';
import { CanView } from '../../middleware/permissions';
import { MessagesArgs } from './message.args';
import { ValidateArgs } from '../../middleware/decorators';

@Resolver(Message)
class MessageResolver implements ResolverInterface<Message> {
  private readonly messageRepo = getCustomRepository(MessageRepo);

  @Authorized('user', 'admin', 'owner')
  @ValidateArgs(MessagesArgs)
  @CanView('conversation')
  @Query(() => [Message])
  async messages(@Args() { conversationId }: MessagesArgs): Promise<Message[]> {
    return this.messageRepo.messages(conversationId);
  }
}

export default MessageResolver;
