import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  ResolverInterface,
  Args,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { ChannelRepo } from '../../repo';
import { Channel } from '../../entity';
import { ContextType } from '../../interfaces';
import { ChannelArgs } from './channel.args';

@Resolver(Channel)
class ChannelResolver implements ResolverInterface<Channel> {
  private readonly channelRepo = getCustomRepository(ChannelRepo);

  @Authorized('user', 'admin', 'owner')
  @Query(() => [Channel])
  async channels(
    @Args() { text }: ChannelArgs,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<Channel[]> {
    return this.channelRepo.search(
      organization.id,
      text,
    );
  }
}

export default ChannelResolver;
