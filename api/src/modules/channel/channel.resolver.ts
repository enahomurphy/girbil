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
import {
  getCustomRepository, getRepository, In,
} from 'typeorm';

import { plainToClass } from 'class-transformer';
import { ChannelRepo, ConversationRepo } from '../../repo';
import { ContextType } from '../../interfaces';
import { ChannelArgs, ChannelIDArgs } from './channel.args';
import { ChannelInput, AddUsersToChannelInput, ChannelUpdateInput } from './channel.input';
import { pick } from '../../utils/utils';
import {
  Channel, ConversationType, Conversation, UserOrganization, ChannelUsers,
} from '../../entity';
import { ChannelMembers } from './channel.type';

@Resolver(Channel)
class ChannelResolver implements ResolverInterface<Channel> {
  private readonly channelRepo = getCustomRepository(ChannelRepo);

  private readonly conversationRepo = getCustomRepository(ConversationRepo);

  private readonly userOrgRepo = getRepository(UserOrganization);

  private readonly channelUsersRepo = getRepository(ChannelUsers);

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
    @Args() { channelId }: ChannelIDArgs,
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
    @Args() { channelId }: ChannelIDArgs,
  ): Promise<ChannelMembers> {
    return this.channelRepo.getMembers(channelId);
  }

  @Authorized('user', 'admin', 'owner')
  @Query(() => ChannelMembers, { nullable: true })
  async usersNotInChannel(
    @Args() { channelId }: ChannelIDArgs,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<ChannelMembers> {
    return this.channelRepo.getUsersNotInChannel(
      organization.id,
      channelId,
    );
  }


  @Authorized('user', 'admin', 'owner')
  @Query(() => [Channel], { nullable: true })
  async searchChannelsNotIn(
    @Arg('text', { nullable: true }) text: string,
      @Ctx() { user: { organization, id } }: ContextType,
  ): Promise<Channel[]> {
    return this.channelRepo.getPublicChannelsUserIsNotIn(
      organization.id,
      id,
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

  // @TODO add canEdit
  // only members of a channel can update a channel
  @Authorized('user', 'admin', 'owner')
  @Mutation(() => Channel)
  async updateChannel(
    @Arg('input') input: ChannelUpdateInput,
      @Args() { channelId }: ChannelIDArgs,
      @Ctx() { user: { id } }: ContextType,
  ): Promise<Channel> {
    const update = pick(input, ['name', 'about', 'isPrivate', 'avatar']);
    const channel = await this.channelRepo.findOne({ id: channelId });

    if (!channel) {
      throw new Error('Channel not found');
    }

    if (update.isPrivate) {
      if (channel.userId !== id) {
        delete update.isPrivate;
      }
    }

    const channelToUpdate = plainToClass(Channel, { ...channel, ...update });

    await this.channelRepo.update({ id: channel.id }, update);

    return channelToUpdate;
  }

  @Authorized('user', 'admin', 'owner')
  @Mutation(() => String)
  async addUsersToChannel(
    @Args() { channelId }: ChannelIDArgs,
      @Arg('input') { userIds }: AddUsersToChannelInput,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<string> {
    const usersInOrg = await this.userOrgRepo.find({
      where: {
        userId: In(userIds),
        organizationId: organization.id,
      },
    });

    const usersAlreadyInChannel = await this.channelUsersRepo.find(
      {
        where: {
          userId: In(usersInOrg.map(({ userId }) => userId)),
          channelId,
        },
      },
    );

    const usersToRemove = new Set(usersAlreadyInChannel.map(({ userId }) => userId));

    const usesToAddToChannel = usersInOrg.filter(({ userId }) => !usersToRemove.has(userId));

    const formatUsersToSave = usesToAddToChannel.map(
      ({ userId }) => (plainToClass(ChannelUsers, { userId, channelId })),
    );

    await this.channelUsersRepo.insert(formatUsersToSave);

    return 'user added';
  }

  @Authorized('user', 'admin', 'owner')
  @Mutation(() => String)
  async leaveChannel(
    @Args() { channelId }: ChannelIDArgs,
      @Ctx() { user: { id } }: ContextType,
  ): Promise<string> {
    await this.channelUsersRepo.delete({ userId: id, channelId });

    return 'User removed';
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

    return this.channelRepo.membersCount(channel.organizationId, channel.id);
  }

  @FieldResolver()
  async isOwner(
    @Root() channel: Channel,
      @Ctx() { user: { id } },
  ): Promise<boolean> {
    return channel.userId && channel.userId === id;

  }
}

export default ChannelResolver;
