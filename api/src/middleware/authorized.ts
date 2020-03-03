import { AuthChecker } from 'type-graphql';
import ContextType from 'src/interfaces';

const authChecker: AuthChecker<ContextType> = ({ context }, roles) => {
  const { user, res } = context;

  if (!roles.length && !user) {
    res.status(401);
    return false;
  }

  if (!user) {
    res.status(403);
    return false;
  }

  return true;
};

export default authChecker;
