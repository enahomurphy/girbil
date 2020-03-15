import { EntityRepository, Repository } from 'typeorm';
import {
  Channel, ChannelOwnerType, Conversation, ChannelUsers, ConversationType,
} from '../entity';

@EntityRepository(Channel)
class ChannelRepository extends Repository<Channel> {
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

      return channel;
    });
  }
}

export default ChannelRepository;
