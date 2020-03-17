import { NextFn, createMethodDecorator } from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { OrganizationRepo } from '../../repo';
import { notFoundError } from './Errorhandler';

export const CanViewUser = createMethodDecorator(
  async ({ context }, next): NextFn => {
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

export const CanEditUser = createMethodDecorator(
  async ({ context, args }, next): NextFn => {
    if (args.userId !== context.user.id) {
      return notFoundError(context, 'User does not exit');
    }

    return next();
  },
);
