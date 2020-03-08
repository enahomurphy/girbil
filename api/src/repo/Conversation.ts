
import { EntityRepository, Repository, getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Conversation, ConversationType, UserConversations } from '../entity';

@EntityRepository(Conversation)
class ConversationRepository extends Repository<Conversation> {
  private readonly userOrgRepo = getRepository(Conversation)

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
}

export default ConversationRepository;
