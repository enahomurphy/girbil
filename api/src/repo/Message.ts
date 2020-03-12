
import { EntityRepository, Repository, IsNull } from 'typeorm';
import { Message } from '../entity';

@EntityRepository(Message)
class MessageRepository extends Repository<Message> {
  async messages(conversationId: string, parentId?: string): Promise<Message[]> {
    const query = {
      where: {
        conversationId,
        parentId: IsNull(),
      },
    };

    if (parentId) {
      query.where.parentId = parentId;
    }

    return this.find({
      ...query,
    });
  }
}

export default MessageRepository;
