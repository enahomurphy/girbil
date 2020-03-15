import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  ResolverInterface,
  Args,
  Arg,
  Mutation,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { ChannelRepo } from '../../repo';
import { Channel } from '../../entity';
import { ContextType } from '../../interfaces';
import { ChannelArgs } from './channel.args';
import { ChannelInput } from './channel.input';

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

  @Authorized('user', 'admin', 'owner')
  @Mutation(() => Channel)
  async createChannel(
    @Arg('input') { name, about, isPrivate }: ChannelInput,
      @Ctx() { user: { id, organization } }: ContextType,
  ): Promise<Channel> {
    return this.channelRepo.createChannel(
      organization.id,
      id,
      isPrivate,
      name,
      about,
    );
  }
}

export default ChannelResolver;
