import { getCustomRepository, getRepository } from 'typeorm';
import { events } from './events';

import { ConversationRepo } from '../../repo';
import { ConversationType, ChannelUsers } from '../../entity';
import { broadcast } from './socket';


export const initializeSocketQueue = (queue): void => {
  const conversationRepo = getCustomRepository(ConversationRepo);
  const channelUsersRepo = getRepository(ChannelUsers);

  queue.on(events.MESSAGE_CREATED, async ({ organizationId, data }): Promise<void> => {
    const conversation = await conversationRepo.findOne({ id: data.conversationId });

    if (!conversation) {
      return null;
    }

    if (conversation.closed.length) {
      await conversationRepo.update({ id: conversation.id }, { closed: [] });
    }

    if (conversation.receiverType === ConversationType.CHANNEL) {
      const channelUsers = await channelUsersRepo.find(
        { where: { channelId: conversation.receiverId } },
      );

      channelUsers
        .forEach(({ userId }) => {
          broadcast(`${userId}-${organizationId}`, events.MESSAGE_CREATED, data);
        });
    }

    if (conversation.receiverType === ConversationType.USER) {
      [conversation.receiverId, conversation.creatorId].forEach((userId) => {
        broadcast(`${userId}-${organizationId}`, events.MESSAGE_CREATED, data);
      });
    }

    return null;
  });
};
