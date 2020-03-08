
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
}

export default ConversationRepository;
