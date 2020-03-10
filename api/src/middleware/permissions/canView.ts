import { ErrorHandler } from './Errorhandler';
import { CanViewConversation } from './conversations';

export const CanView = (type: string): void => {
  switch (type) {
    case 'conversation':
      return CanViewConversation;
    default:
      return ErrorHandler;
  }
};

export default CanView;
