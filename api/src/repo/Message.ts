
import { EntityRepository, Repository, IsNull } from 'typeorm';
import { Message } from '../entity';

@EntityRepository(Message)
class MessageRepository extends Repository<Message> {
  async messages(conversationId: string, parentId?: string): Promise<Message[]> {
    const query = this.createQueryBuilder('message')
      .setParameter('conversationId', conversationId)
      .setParameter('parentId', parentId)
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
    
      

    if (parentId) {
      query
        .where('message.conversation_id = :conversationId AND message.parent_id IS NOT NULL')
        .andWhere('message.parent_id = :parentId');
    }

    return query.getMany();
  }
}

export default MessageRepository;
