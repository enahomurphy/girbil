import Express from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepo, OrganizationRepo } from '../repo';
import { decode } from '../utils/jwt';

const Authenticated = async (
  req: Express.Request,
  res: Express.Request,
  next: Express.NextFunc,
): Promise<void> => {
  const userRepo = getCustomRepository(UserRepo);
  const orgRepo = getCustomRepository(OrganizationRepo);

  const tokenWithBearer = req.headers.authorization || '';
  const token = tokenWithBearer.split(' ')[1];
  const user = decode(token);

  if (user) {
    const { organization, id } = user;
    const foundUser = await userRepo.findOne({ id });
    if (foundUser) {
      req.user = foundUser.user;

      if (organization) {
        const orgAccount = await orgRepo.hasUser(
          organization.id,
          user.id,
        );

        if (orgAccount) {
          organization.role = orgAccount.role;
          req.user.organization = organization;
        } else {
          req.user.organization = null;
        }
      }
    }
  }

  next();
};

export default Authenticated;
