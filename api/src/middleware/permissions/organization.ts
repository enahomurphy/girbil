import { NextFn, createMethodDecorator } from 'type-graphql';
import { getCustomRepository } from 'typeorm';

import { OrganizationRepo } from '../../repo';
import { unAuthError } from './Errorhandler';

export const CanViewOrganization = createMethodDecorator(
  async ({ context }, next): NextFn => {
    const orgRepo = getCustomRepository(OrganizationRepo);

    const org = await orgRepo.hasUser(
      context.user.organization.id,
      context.user.id,
    );

    if (!org) {
      return unAuthError(context, 'Conversation does not exit');
    }

    return next();
  },
);
