import { createMethodDecorator } from 'type-graphql';

import { unAuthError } from './errorhandler';
import { ContextType } from '../../interfaces';

export const CanViewOrganization = createMethodDecorator<ContextType>(
  async ({ context }, next) => {
    if (!context.user.organization) {
      return unAuthError(context, 'Organization does not exit');
    }

    return next();
  },
);

export const CanEditOrganization = createMethodDecorator<ContextType>(
  async ({ context }, next) => {
    if (!context.user.organization) {
      return unAuthError(context, 'Organization does not exit');
    }

    return next();
  },
);
