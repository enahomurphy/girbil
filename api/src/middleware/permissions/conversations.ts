import { NextFn, createMethodDecorator } from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { ConversationRepo } from '../../repo';
import { notFoundError } from './Errorhandler';

export const CanViewConversation = createMethodDecorator(
  async ({ context, args }, next): NextFn => {
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
