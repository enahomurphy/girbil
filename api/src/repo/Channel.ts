import { EntityRepository, Repository, getRepository } from 'typeorm';
import {
  Channel, ChannelOwnerType, Conversation, ChannelUsers, ConversationType,
} from '../entity';

@EntityRepository(Channel)
class ChannelRepository extends Repository<Channel> {
  private readonly channelUsersRepo = getRepository(ChannelUsers)

  async search(organizationId: string, text: string): Promise<Channel[]> {
    const query = this.createQueryBuilder('channel')
      .leftJoinAndSelect('channel.conversation', 'conversation')
      .addSelect('( SELECT COUNT(*) FROM channel_users WHERE channel_id = channel.id )', 'channel_members')
      .setParameter('text', `${text}:*`);

    if (text) {
      query.where('tsv @@ plainto_tsquery(:text)');
    }

    return query.andWhere('channel.organization_id = :organizationId', { organizationId })
      .take(20)
      .skip(0)
      .getMany();
  }

  async membersCount(organizationId: string, channelId: string): Promise<Channel[]> {
    return this.channelUsersRepo.count({
      where: {
        channelId,
      },
    });
  }

  async createChannel(
    organizationId, userId, isPrivate, name, about,
  ): Promise<Channel> {
    return this.manager.transaction(async (manager) => {
      const channel = new Channel();
      channel.name = name;
      channel.about = about;
      channel.userId = userId;
      channel.isPrivate = isPrivate;
      channel.ownerId = organizationId;
      channel.organizationId = organizationId;
      channel.lastUpdateById = userId;
      channel.ownerType = ChannelOwnerType.ORGANIZATION;

      await manager.save(channel);

      const channelUser = new ChannelUsers();
      channelUser.channelId = channel.id;
      channelUser.userId = userId;

      await manager.save(channelUser);

      const conversation = new Conversation();
      conversation.creatorId = userId;
      conversation.receiverId = channel.id;
      conversation.organizationId = organizationId;
      conversation.receiverType = ConversationType.CHANNEL;

      await manager.save(conversation);

      channel.conversation = conversation;
      return channel;
    });
  }

  async getMembers<T>(channelId: string): Promise<T> {
    const result = await this.channelUsersRepo.createQueryBuilder('channel_users')
      .setParameter('channelId', channelId)
      .where('channel_users.channel_id = :channelId')
      .leftJoinAndSelect('channel_users.user', 'user')
      .limit(50)
      .getManyAndCount();

    return {
      members: result[0].map(({ user }) => user),
      count: result[1],
    };
  }
}

export default ChannelRepository;
