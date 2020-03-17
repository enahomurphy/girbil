
import { ErrorHandler } from './Errorhandler';
import { CanEditUser } from './user';
import { CanEditOrganization } from './organization';

export const CanEdit = (type: string): void => {
  switch (type) {
    case 'user':
      return CanEditUser;
    case 'organization':
      return CanEditOrganization;
    default:
      return ErrorHandler;
  }
};

export default CanEdit;
