import { getCustomRepository } from 'typeorm';
import { createMethodDecorator } from 'type-graphql';

import { notFoundError } from './errorhandler';
import { MessageRepo } from '../../repo';
import { ContextType } from '../../interfaces';

export const CanEditMessage = createMethodDecorator<ContextType>(
  async ({ context, args }, next) => {
    const messageRepo = getCustomRepository(MessageRepo);
    const message = await messageRepo.findOne({
      senderId: context.user.id,
      id: args.messageId,
    });

    if (!message) {
      return notFoundError(context, 'Message does not exit');
    }

    return next();
  },
);
