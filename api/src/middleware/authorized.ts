import { AuthChecker } from 'type-graphql';
import ContextType from 'src/interfaces';

const authChecker: AuthChecker<ContextType> = ({ context }, roles) => {
  const { user, res } = context;
  if (!user) {
    res.status(401);
    return false;
  }

  if (roles.length && !user.organization) {
    res.status(403);
    return false;
  }

  if (roles.length && !roles.includes(user.organization.role)) {
    res.status(403);
    return false;
  }

  return true;
};

export default authChecker;
