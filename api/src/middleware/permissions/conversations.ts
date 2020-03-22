import { createMethodDecorator } from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { ContextType } from '../../interfaces';
import { ConversationRepo } from '../../repo';
import { notFoundError } from './errorhandler';

export const CanViewConversation = createMethodDecorator<ContextType>(
  async ({ context, args }, next) => {
    const conversationRepo = getCustomRepository(ConversationRepo);
    const conversation = await conversationRepo.hasUser(
      args.conversationId,
      context.user.id,
      context.user.organization.id,
    );

    if (!conversation) {
      return notFoundError(context, 'Conversation does not exit');
    }

    return next();
  },
);
