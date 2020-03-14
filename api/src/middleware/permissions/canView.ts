import { ErrorHandler } from './Errorhandler';
import { CanViewConversation } from './conversations';
import { CanViewUser } from './user';

export const CanView = (type: string): void => {
  switch (type) {
    case 'conversation':
      return CanViewConversation;
    case 'user':
      return CanViewUser;
    default:
      return ErrorHandler;
  }
};

export default CanView;
