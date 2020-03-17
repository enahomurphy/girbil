import { NextFn, createMethodDecorator } from 'type-graphql';
import { unAuthError } from './Errorhandler';

export const CanViewOrganization = createMethodDecorator(
  async ({ context }, next): NextFn => {
    if (!context.user.organization) {
      return unAuthError(context, 'Organization does not exit');
    }

    return next();
  },
);

export const CanEditOrganization = createMethodDecorator(
  async ({ context }, next): NextFn => {
    if (!context.user.organization) {
      return unAuthError(context, 'Organization does not exit');
    }

    return next();
  },
);
