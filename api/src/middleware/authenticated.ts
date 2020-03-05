
import Express from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepo, OrganizationRepo } from '../repo';
import { decode } from '../utils/jwt';
import { Organization } from 'src/entity';

const Authenticated = async (
  req: Express.Request,
  res: Express.Request,
  next: Express.NextFunc,
): Promise<void> => {
  const userRepo = getCustomRepository(UserRepo);
  const tokenWithBearer = req.headers.authorization || '';
  const token = tokenWithBearer.split(' ')[1];
  let user = decode(token);

  if (user) {
    req.user = await userRepo.findOne({ id: user.id });
    req.user.organization = user.organization;
  }

  next();
};

export default Authenticated;
