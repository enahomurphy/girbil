
import { ErrorHandler } from './errorhandler';
import { CanViewConversation } from './conversations';
import { CanViewUser } from './user';
import { CanViewOrganization } from './organization';

export const CanView = (type: string): MethodDecorator => {
  switch (type) {
    case 'conversation':
      return CanViewConversation;
    case 'user':
      return CanViewUser;
    case 'organization':
      return CanViewOrganization;
    default:
      return ErrorHandler;
  }
};

export default CanView;
