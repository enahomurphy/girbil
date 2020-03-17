import { ErrorHandler } from './Errorhandler';
import { CanViewConversation } from './conversations';
import { CanViewUser } from './user';
import { CanViewOrganization } from './organization';

export const CanView = (type: string): void => {
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
