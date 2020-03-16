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

import { IsUUID } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ChannelRepo, ConversationRepo } from '../../repo';
import { ContextType } from '../../interfaces';
import { ChannelArgs } from './channel.args';
import { ChannelInput, AddUsersToChannelInput } from './channel.input';
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
  @Query(() => ChannelMembers, { nullable: true })
  async usersNotInChannel(
    @Arg('channelId') @IsUUID() channelId: string,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<ChannelMembers> {
    return this.channelRepo.getUsersNotInChannel<ChannelMembers>(
      organization.id,
      channelId,
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

  @Authorized('user', 'admin', 'owner')
  @Mutation(() => String)
  async addUsersToChannel(
    @Arg('channelId') @IsUUID() channelId: string,
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
}

export default ChannelResolver;
