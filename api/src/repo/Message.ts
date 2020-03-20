
import { EntityRepository, Repository, IsNull } from 'typeorm';
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
      `, 'message_replyCount')
        query.where('message.conversation_id = :conversationId AND message.parent_id IS NULL')
      }
    
      query.addSelect(`(
        SELECT COUNT(id) > 0 as read FROM messages  as gn
        WHERE :userId = ANY(coalesce(gn.read, array[]::uuid[]))
        AND id = message.id
        LIMIT 1
      )`, 'message_hasRead')

    if (parentId) {
      query
        .where('message.conversation_id = :conversationId AND message.parent_id IS NOT NULL')
        .andWhere('message.parent_id = :parentId');
    }

    return query.getMany();
  }
}

export default MessageRepository;
