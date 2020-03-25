import { EntityRepository, Repository, getRepository } from 'typeorm';
import {
  Channel, ChannelOwnerType, Conversation, ChannelUsers, ConversationType, UserOrganization,
} from '../entity';
import { ChannelMembers } from '../interfaces/channel';

@EntityRepository(Channel)
class ChannelRepository extends Repository<Channel> {
  private readonly channelUsersRepo = getRepository(ChannelUsers)

  private readonly userOrgRepo = getRepository(UserOrganization)

  async search(organizationId: string, text: string): Promise<Channel[]> {
    const query = this.createQueryBuilder('channel')
      .leftJoinAndSelect('channel.conversation', 'conversation')
      .addSelect('( SELECT COUNT(*) FROM channel_users WHERE channel_id = channel.id )', 'channel_members')
      .setParameter('text', `${text}:*`);

    if (text) {
      query.where('tsv @@ plainto_tsquery(:text)');
    }

    return query.andWhere('channel.organization_id = :organizationId', { organizationId })
      .take(50)
      .skip(0)
      .getMany();
  }

  async membersCount(organizationId: string, channelId: string): Promise<number> {
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

  async getMembers(channelId: string): Promise<ChannelMembers> {
    const result = await this.channelUsersRepo.createQueryBuilder('channel_users')
      .setParameter('channelId', channelId)
      .leftJoinAndSelect('channel_users.user', 'user')
      .where('channel_users.channel_id = :channelId')
      .limit(50)
      .getManyAndCount();

    return {
      members: result[0].map(({ user }) => user),
      count: result[1],
    };
  }

  async getUsersNotInChannel(organizationId: string, channelId: string): Promise<ChannelMembers> {
    const result = await this.userOrgRepo.createQueryBuilder('user_org')
      .setParameter('channelId', channelId)
      .setParameter('organizationId', organizationId)
      .leftJoinAndSelect('user_org.user', 'user')
      .where('user_org.organization_id = :organizationId')
      .andWhere(
        ` (
          SELECT 
            COUNT(channel_users.user_id) 
          FROM 
            channel_users
          WHERE 
            user_org.user_id = channel_users.user_id 
          AND 
            channel_users.channel_id = :channelId
          LIMIT 1
        )  = 0`,
      )
      .limit(50)
      .getManyAndCount();

    return {
      members: result[0].map(({ user }) => user),
      count: result[1],
    };
  }
}

export default ChannelRepository;
