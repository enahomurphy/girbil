import { ErrorHandler } from './errorhandler';
import { CanEditUser } from './user';

import { CanEditOrganization } from './organization';
import { CanEditMessage } from './message';

export const CanEdit = (type: string): MethodDecorator => {
  switch (type) {
    case 'user':
      return CanEditUser;
    case 'organization':
      return CanEditOrganization;
    case 'message':
      return CanEditMessage;
    default:
      return ErrorHandler;
  }
};

export default CanEdit;
