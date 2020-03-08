
import Express from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepo } from '../repo';
import { decode } from '../utils/jwt';

const Authenticated = async (
  req: Express.Request,
  res: Express.Request,
  next: Express.NextFunc,
): Promise<void> => {
  const userRepo = getCustomRepository(UserRepo);
  const tokenWithBearer = req.headers.authorization || '';
  const token = tokenWithBearer.split(' ')[1];
  const user = decode(token);

  if (user) {
    const foundUser = await userRepo.findOne({ id: user.id });
    if (foundUser) {
      req.user = foundUser;
      req.user.organization = user.organization;
    }
  }

  next();
};

export default Authenticated;
