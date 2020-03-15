import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  ResolverInterface,
  Args,
  Arg,
  Mutation,
  FieldResolver,
  Root,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { IsUUID } from 'class-validator';
import { ChannelRepo, ConversationRepo } from '../../repo';
import { ContextType } from '../../interfaces';
import { ChannelArgs } from './channel.args';
import { ChannelInput } from './channel.input';
import { pick } from '../../utils/utils';
import {
  Channel, ConversationType, Conversation,
} from '../../entity';
import { ChannelMembers } from './channel.type';

@Resolver(Channel)
class ChannelResolver implements ResolverInterface<Channel> {
  private readonly channelRepo = getCustomRepository(ChannelRepo);

  private readonly conversationRepo = getCustomRepository(ConversationRepo);

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
  @Query(() => Channel, { nullable: true })
  async channel(
    @Arg('channelId') @IsUUID() channelId: string,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<Channel> {
    return this.channelRepo.findOne({
      where: {
        organizationId: organization.id,
        id: channelId,
      },
    });
  }

  @Authorized('user', 'admin', 'owner')
  @Query(() => ChannelMembers, { nullable: true })
  async channelMembers(
    @Arg('channelId') @IsUUID() channelId: string,
  ): Promise<ChannelMembers> {
    return this.channelRepo.getMembers<ChannelMembers>(channelId);
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

  // @TODO add canEdit
  // only members of a channel can update a channel
  @Authorized('user', 'admin', 'owner')
  @Mutation(() => String)
  async updateChannel(
    @Arg('input') input: ChannelInput,
      @Arg('channelId') @IsUUID() channelId: string,
      @Ctx() { user: { id, organization } }: ContextType,
  ): Promise<string> {
    const update = pick(input, ['name', 'about', 'isPrivate']);
    if (update.isPrivate) {
      const channel = await this.channelRepo.findOne({ id: channelId });

      if (channel.userId !== id) {
        delete update.isPrivate;
      }
    }

    await this.channelRepo.update(
      { organizationId: organization.id, id: channelId },
      update,
    );

    return 'channel updated';
  }

  @FieldResolver()
  async conversation(
    @Root() channel: Channel,
      @Ctx() { user: { organization } },
  ): Promise<Conversation> {
    if (channel.conversation) {
      return channel.conversation;
    }

    return this.conversationRepo.findOne({
      organizationId: organization.id,
      receiverId: channel.id,
      receiverType: ConversationType.CHANNEL,
    });
  }

  @FieldResolver()
  async members(
    @Root() channel: Channel,
  ): Promise<number> {
    if (channel.members) {
      return channel.members;
    }

    return this.channelRepo.membersCount(channel.id);
  }
}

export default ChannelResolver;
