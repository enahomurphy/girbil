import { createMethodDecorator } from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { OrganizationRepo } from '../../repo';
import { ContextType } from '../../interfaces';
import { notFoundError } from './errorhandler';

export const CanViewUser = createMethodDecorator<ContextType>(
  async ({ context }, next) => {
    const orgRepo = getCustomRepository(OrganizationRepo);
    const user = await orgRepo.hasUser(
      context.user.organization.id,
      context.user.id,
    );

    if (!user) {
      return notFoundError(context, 'User does not exit');
    }

    return next();
  },
);

export const CanEditUser = createMethodDecorator<ContextType>(
  async ({ context, args }, next) => {
    if (args.userId !== context.user.id) {
      return notFoundError(context, 'User does not exit');
    }

    return next();
  },
);
