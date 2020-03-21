import { getCustomRepository } from 'typeorm';
import { NextFn, createMethodDecorator } from 'type-graphql';
import { notFoundError } from './Errorhandler';
import { MessageRepo } from '../../repo';

export const CanEditMessage = createMethodDecorator(
  async ({ context, args }, next): NextFn => {
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
