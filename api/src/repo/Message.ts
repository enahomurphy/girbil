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

    query.addSelect(`(
        SELECT COUNT(id) > 0 as read FROM messages  as gn
        WHERE :userId = ANY(coalesce(gn.read, array[]::uuid[]))
        AND id = message.id
        LIMIT 1
      )`, 'message_hasRead');

    if (parentId) {
      query
        .where('message.conversation_id = :conversationId AND message.parent_id IS NOT NULL')
        .andWhere('message.parent_id = :parentId');
    }

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
}

export default MessageRepository;
