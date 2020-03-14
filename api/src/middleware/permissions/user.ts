import { NextFn, createMethodDecorator } from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { OrganizationRepo } from '../../repo';
import { notFoundError } from './Errorhandler';

export const CanViewUser = createMethodDecorator(
  async ({ context, args }, next): NextFn => {
    const orgRepo = getCustomRepository(OrganizationRepo);
    const user = await orgRepo.hasUser(
      args.userId,
      context.user.organization.id,
    );

    if (!user) {
      return notFoundError(context, 'User does not exit');
    }

    return next();
  },
);