
import { EntityRepository, Repository } from 'typeorm';
import { Message } from '../entity';

@EntityRepository(Message)
class MessageRepository extends Repository<Message> {
  async messages(conversationId: string): Promise<Message[]> {
    return this.find({
      where: {
        conversationId,
      },
    });
  }
}

export default MessageRepository;
