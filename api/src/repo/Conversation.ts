
import { EntityRepository, Repository, getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import {
  Conversation, ConversationType, UserConversations, UserOrganization,
} from '../entity';

@EntityRepository(Conversation)
class ConversationRepository extends Repository<Conversation> {
  private readonly userOrgRepo = getRepository(UserOrganization)

  async conversations(userId: string, organizationId: string): Promise<UserConversations[]> {
    const conversations = await this.manager.find(UserConversations, {
      where: [
        {
          userId,
          organizationId,
        },
        {
          creatorId: userId,
        },
        {
          receiverId: userId,
          organizationId,
        },
      ],
      relations: ['receiver', 'channel', 'creator'],
    });

    return conversations.map((conversation) => {
      if (conversation.receiverType !== ConversationType.CHANNEL) {
        if (conversation.receiver.id === userId) {
          return plainToClass(Conversation, {
            ...conversation,
            receiver: conversation.creator,
          });
        }
      }

      return conversation;
    });
  }

  async conversation(id: string, organizationId: string): Promise<Conversation> {
    return this.manager.find(UserConversations, {
      cache: true,
      where: [
        {
          id,
          organizationId,
        },
      ],
    });
  }

  async hasUser(id: string, userId: string, organizationId: string): Promise<Conversation> {
    return this.manager.findOne(UserConversations, {
      cache: true,
      where: [
        {
          id,
          organizationId,
          userId,
          receiverType: ConversationType.CHANNEL,
        },
        {
          id,
          organizationId,
          creatorId: userId,
          receiverType: ConversationType.USER,
        },
        {
          id,
          organizationId,
          receiverId: userId,
          receiverType: ConversationType.USER,
        },
      ],
    });
  }

  async getUsersWithoutConversation(
    organizationId: string, userId: string, q?: string,
  ): Promise<Users[]> {
    const query = this.userOrgRepo.createQueryBuilder('org_user')
      .setParameter('userId', userId)
      .setParameter('organizationId', organizationId)
      .setParameter('type', 'user')
      .setParameter('query', `%${q}%`)
      .leftJoinAndSelect('org_user.user', 'user')
      .where('org_user.user_id != :userId')
      .andWhere('org_user.organization_id = :organizationId');

    if (q) {
      query.andWhere('user.name ILIKE :query');
    }

    const result = await query.andWhere(`
      (
        SELECT COUNT(id)
            FROM conversations as conversation 
        WHERE 
            conversation.receiver_id = :userId 
        AND 
            conversation.creator_id = org_user.user_id
        OR 
            conversation.creator_id = :userId
        AND 
            conversation.receiver_id = org_user.user_id
        AND 
            conversation.receiver_type = :type
      ) = 0;
    `)
      .getMany();

    return result.map(({ user }) => user);
  }

  async userConversation(
    organizationId: string, senderId: string, receiverId: string,
  ): Promise<Conversation> {
    return this.findOne({
      where: [
        {
          receiverType: ConversationType.USER,
          creatorId: senderId,
          organizationId,
          receiverId,
        },
        {
          receiverType: ConversationType.USER,
          creatorId: receiverId,
          organizationId,
          receiverId: senderId,
        },
      ],
    });
  }

  async findUserConversationOrCreate(
    organizationId: string, senderId: string, receiverId: string,
  ): Promise<Conversation> {
    let conversation = await this.userConversation(organizationId, senderId, receiverId);

    if (!conversation) {
      conversation = this.create({
        creatorId: senderId,
        receiverId,
        organizationId,
        receiverType: ConversationType.USER,
      });

      await this.save(conversation);
    }

    return conversation;
  }
}

export default ConversationRepository;
