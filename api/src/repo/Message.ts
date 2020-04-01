import { EntityRepository, Repository } from 'typeorm';
import { Message } from '../entity';

@EntityRepository(Message)
class MessageRepository extends Repository<Message> {
  async messages(conversationId: string, userId: string, parentId?: string): Promise<Message[]> {
    const query = this.createQueryBuilder('message')
      .setParameter('conversationId', conversationId)
      .setParameter('parentId', parentId)
      .setParameter('userId', userId)
      .leftJoinAndSelect('message.sender', 'sender');

    if (!parentId) {
      query.addSelect(`
        (
          SELECT COUNT(*)
          FROM messages as thread
          WHERE thread.parent_id = message.id
        )
      `, 'message_replyCount');

      query.where('message.conversation_id = :conversationId AND message.parent_id IS NULL');
    }

    query.addSelect(
      '(:userId = ANY(coalesce(message.read, array[]::uuid[])))',
      'message_hasRead',
    );

    query.addSelect(`
    (
      SELECT array_agg(
        json_build_object('reaction', each.reaction, 'count', each.reaction_count, 'userReacted', each.user_reacted)
        ) FROM (
          SELECT x.reaction, count(x.reaction) as reaction_count,
          SUM((case when x."userId" = :userId then 1 end)) = 1 as user_reacted
          FROM messages m, jsonb_to_recordset(m.reactions) as x(reaction text, "userId" text)
          WHERE m.id = message.id
          GROUP BY x.reaction
      ) as each
    )`, 'message_reactions');

    if (parentId) {
      query
        .where('message.conversation_id = :conversationId AND message.parent_id IS NOT NULL')
        .andWhere('message.parent_id = :parentId');
    }

    query.orderBy('message.createdAt', 'ASC');

    return query.getMany();
  }

  async updateReaction(messageId: string, userId: string, reaction: string): Promise<any> {
    const reactionData = {
      userId,
      reaction,
    };

    const [result]: any = await this.query(`
      SELECT index-1 AS position
      FROM messages, jsonb_array_elements(reactions) with ordinality arr(reaction, index)
      where reaction->>'reaction' = $1 and reaction->>'userId' = $2
      and id = $3 LIMIT 1
    `, [reaction, userId, messageId]);


    const { position } = result || {};

    if (Number(position || {}) >= 0) {
      await this.query(`
        UPDATE messages SET reactions = reactions::jsonb - ${position}
        WHERE id = $1
      `, [messageId]);
    } else {
      await this.query(`
        UPDATE messages SET reactions = reactions || $1::jsonb
        WHERE id = $2
      `, [reactionData, messageId]);
    }

    return [];
  }

  async findAllUnreadMessagesBeforeDate(
    conversationId: string, userId: string, createdAt: Date,
  ): Promise<Message[]> {
    return this.createQueryBuilder('message')
      .setParameter('conversationId', conversationId)
      .setParameter('userId', userId)
      .setParameter('createdAt', createdAt)
      .where('message.conversation_id = :conversationId')
      .andWhere('(message.created_at::timestamptz(0) < :createdAt OR message.created_at::timestamptz(0) = :createdAt::timestamptz(0))')
      .andWhere('NOT :userId = ANY(coalesce(read, array[]::uuid[]))')
      .getMany();
  }
}

export default MessageRepository;
