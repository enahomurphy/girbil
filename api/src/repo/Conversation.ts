import { EntityRepository, Repository, getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import {
  Conversation, ConversationType, UserOrganization, User,
} from '../entity';

@EntityRepository(Conversation)
class ConversationRepository extends Repository<Conversation> {
  private readonly userOrgRepo = getRepository(UserOrganization)

  async conversations(
    userId: string, organizationId: string, conversationId?: string,
  ): Promise<Conversation[]> {
    const query = this.createQueryBuilder('conversation')
      .setParameter('userId', userId)
      .setParameter('organizationId', organizationId)
      .setParameter('conversationId', conversationId)
      .leftJoinAndSelect('conversation.creator', 'creator')
      .leftJoinAndSelect('conversation.receiver', 'receiver')
      .leftJoinAndSelect('conversation.channel', 'channel')
      .addSelect(`
        (
          SELECT COUNT(id) FROM messages
            WHERE conversation_id = "conversation"."id"
            AND NOT (:userId = ANY(coalesce(read, array[]::uuid[])))
        )
      `, 'conversation_unread');

    if (conversationId) {
      query.where('conversation.id = :conversationId');
    } else {
      query.addSelect(`
        (
          SELECT created_at FROM messages 
          WHERE conversation_id = "conversation"."id"
          ORDER BY created_at DESC
          LIMIT 1
        )
      `, 'conversation_last_updated')
      .where('conversation.organizationId = :organizationId')
      .orderBy('conversation_last_updated', 'DESC', 'NULLS LAST');
    }
    query.andWhere(`
        ((
          (

            SELECT COUNT(channel_users.user_id)
            FROM channel_users
            WHERE user_id = :userId
            AND channel_id = conversation.receiver_id
            LIMIT 1
          ) = 1
          AND NOT :userId = ANY(coalesce(closed, array[]::uuid[]))
        )

        OR (
          conversation.receiver_type = 'user'
          AND (
            conversation.creator_id = :userId
            OR conversation.receiver_id = :userId
          )
          AND conversation.organizationId = :organizationId
          AND NOT :userId = ANY(coalesce(closed, array[]::uuid[]))
        ))
      `);

    let conversations = [];
    if (conversationId) {
      const result = await query.getOne();
      conversations = [result];
    } else {
      conversations = await query.getMany();
    }

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
    return this.findOne({
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
    return this.createQueryBuilder('conversation')
      .cache(true)
      .setParameter('id', id)
      .setParameter('userId', userId)
      .setParameter('organizationId', organizationId)
      .where('conversation.id = :id')
      .andWhere('conversation.organization_id = :organizationId')
      .andWhere(
        `
        (
          (
              SELECT COUNT(channel_id) > 0 as channel
              FROM channel_users
              WHERE channel_id = conversation.receiver_id
              AND conversation.receiver_type = 'channel'
              AND user_id = :userId
              LIMIT 1
          )

          OR (
              creator_id = :userId
              OR receiver_id = :userId
          )
        )
        `,
      )
      .getOne();
  }

  async getUsersWithoutConversation(
    organizationId: string, userId: string, q?: string,
  ): Promise<User[]> {
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
        SELECT
          COUNT(id) = 0 as has_conversation
        FROM
          conversations as conversation
        WHERE
            organization_id = :organizationId
        AND (
          (
              conversation.receiver_id = :userId
              AND conversation.creator_id = org_user.user_id
              AND receiver_type = 'user'
          )
            OR (
                conversation.creator_id = :userId
                AND conversation.receiver_id = org_user.user_id
                AND receiver_type = 'user'
            )
          )
        AND NOT :userId = ANY(coalesce(conversation.closed, array[]::uuid[]))
        LIMIT
          1
      )
    `)
      .take(50)
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

  async getChannelConversation(
    organizationId: string, channelId: string,
  ): Promise<Conversation> {
    return this.createQueryBuilder('conversation')
      .setParameter('organizationId', organizationId)
      .setParameter('channelId', channelId)
      .where('conversation.receiverId = :channelId')
      .andWhere('conversation.organizationId = :organizationId')
      .getOne();
  }
}

export default ConversationRepository;
