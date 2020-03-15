
import { ErrorHandler } from './Errorhandler';
import { CanEditUser } from './user';

export const CanEdit = (type: string): void => {
  switch (type) {
    case 'user':
      return CanEditUser;
    default:
      return ErrorHandler;
  }
};

export default CanEdit;
